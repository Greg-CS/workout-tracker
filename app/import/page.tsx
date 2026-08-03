"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Loader2, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { parseMarkdownLog, type ParsedLogEntry } from "@/lib/importParser";

export default function ImportPage() {
  const { user, isLoaded } = useUser();
  const userData = useQuery(api.users.getUser, { clerkId: user?.id ?? "" });
  const userId = userData?._id;
  const batchImport = useMutation(api.workoutLogs.batchImportLogs);

  const [markdown, setMarkdown] = useState("");
  const [parsed, setParsed] = useState<ParsedLogEntry[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ inserted: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    setError(null);
    setResult(null);
    try {
      const entries = parseMarkdownLog(markdown, userData?.selectedTemplate ?? "calisthenics");
      if (entries.length === 0) {
        setError("No valid entries found. Make sure the markdown contains a table with Date, Day, Exercise, Reps/Set, Sets, and Total Reps columns.");
        return;
      }
      setParsed(entries);
    } catch {
      setError("Failed to parse markdown. Check the format and try again.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMarkdown(ev.target?.result as string);
      setParsed(null);
      setResult(null);
      setError(null);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!parsed || !userId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await batchImport({ userId, logs: parsed });
      setResult(res);
      setParsed(null);
      setMarkdown("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import logs");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold">Import Workout Logs</h1>
        <p className="mt-1 text-sm text-foreground/50">
          Paste your markdown workout log or upload a .md file to bulk import entries into your history.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="flex items-start gap-2 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Successfully imported {result.inserted} workout log entries.</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Markdown Input
          </CardTitle>
          <CardDescription>
            Expected format: <code className="text-xs">| Date | Day | Exercise | Reps/Set | Sets | Total Reps |</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input type="file" accept=".md,.txt" onChange={handleFileUpload} className="hidden" />
              <span className="inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-white px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary/10 dark:border-foreground/10 dark:bg-foreground/5 dark:hover:bg-foreground/10">
                <Upload className="h-4 w-4" />
                Upload .md file
              </span>
            </label>
            {markdown && (
              <Button variant="outline" onClick={() => { setMarkdown(""); setParsed(null); setResult(null); setError(null); }}>
                Clear
              </Button>
            )}
          </div>

          <textarea
            value={markdown}
            onChange={(e) => { setMarkdown(e.target.value); setParsed(null); setResult(null); }}
            placeholder={`| Date | Day | Exercise | Reps/Set | Sets | Total Reps |\n|------|-----|----------|----------|------|------------|\n| 2026-04-13 19:19 | Day 1 | Feet-Elevated Push-ups | 25 | 4 | 100 |`}
            className="h-64 w-full rounded-md border border-secondary/30 bg-white p-3 font-mono text-xs text-foreground/80 dark:border-foreground/10 dark:bg-foreground/5"
          />

          <Button onClick={handleParse} disabled={!markdown.trim()}>
            Parse Entries
          </Button>
        </CardContent>
      </Card>

      {parsed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Preview ({parsed.length} entries)</span>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !userId}
                size="sm"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Importing...</>
                ) : (
                  <>Import {parsed.length} Logs</>
                )}
              </Button>
            </CardTitle>
            <CardDescription>
              Review the parsed entries below. Category and load are inferred from exercise names.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto rounded-md border border-secondary/20 dark:border-foreground/10">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-secondary/10 dark:bg-foreground/10">
                  <tr className="text-left">
                    <th className="p-2 font-semibold">Date</th>
                    <th className="p-2 font-semibold">Day</th>
                    <th className="p-2 font-semibold">Exercise</th>
                    <th className="p-2 font-semibold">Reps</th>
                    <th className="p-2 font-semibold">Sets</th>
                    <th className="p-2 font-semibold">Total</th>
                    <th className="p-2 font-semibold">Category</th>
                    <th className="p-2 font-semibold">Load</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.map((entry, i) => (
                    <tr key={i} className="border-t border-secondary/10 dark:border-foreground/5">
                      <td className="p-2 text-foreground/60">{new Date(entry.date).toLocaleString()}</td>
                      <td className="p-2 text-foreground/60">{entry.dayLabel}</td>
                      <td className="p-2 font-medium">{entry.exerciseName}</td>
                      <td className="p-2 text-foreground/60">{entry.reps}</td>
                      <td className="p-2 text-foreground/60">{entry.sets}</td>
                      <td className="p-2 text-foreground/60">{entry.totalReps}</td>
                      <td className="p-2"><Badge variant="secondary">{entry.category}</Badge></td>
                      <td className="p-2 text-foreground/60">{entry.load}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
