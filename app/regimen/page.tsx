"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader2, Download, FileText } from "lucide-react";
import { templates } from "@/lib/templates";
import { ExerciseDescription } from "@/components/ExerciseImage";
import Link from "next/link";

export default function RegimenPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const userId = userData?._id;
  const regimen = useQuery(
    api.regimens.getRegimen,
    userId ? { userId } : "skip",
  );

  const isLoading = !userLoaded || userData === undefined || (userId && regimen === undefined);

  const handleDownloadPDF = () => {
    if (!regimen) return;
    const template = templates.find((t) => t.key === regimen.templateKey);
    if (!template) return;

    import("jspdf").then(({ jsPDF }) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(`${template.name} Regimen`, 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Athlete: ${user?.fullName ?? "Unknown"}`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 36);
        doc.setTextColor(0);

        let y = 46;

        regimen.days.forEach((day) => {
          if (y > 250) {
            doc.addPage();
            y = 20;
          }

          doc.setFontSize(14);
          doc.text(`Day ${day.day}: ${day.title}`, 14, y);
          y += 6;

          const autoTable = (doc as unknown as { autoTable: (config: unknown) => void }).autoTable;
          autoTable({
            startY: y,
            head: [["Exercise", "Category", "Sets", "Target", "Load", "Rest", "Notes"]],
            body: day.exercises.map((ex) => [
              ex.name,
              ex.category,
              String(ex.sets),
              ex.target,
              ex.load,
              `${ex.rest}s`,
              ex.notes,
            ]),
            theme: "striped",
            headStyles: { fillColor: [16, 185, 129] },
            styles: { fontSize: 8, cellPadding: 2 },
          });

          y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
        });

        doc.save(`${template.key}-regimen.pdf`);
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!regimen) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="mb-4 h-10 w-10 text-zinc-300 dark:text-zinc-700" />
            <p className="mb-2 text-lg font-medium">No regimen yet</p>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Select a training template to view and download your regimen.
            </p>
            <Link href="/templates">
              <Button>Choose Template</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const template = templates.find((t) => t.key === regimen.templateKey);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{template?.name ?? "Your"} Regimen</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {regimen.days.length}-day training plan
          </p>
        </div>
        <Button onClick={handleDownloadPDF}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="space-y-4">
        {regimen.days.map((day) => (
          <Card key={day.day}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Day {day.day}: {day.title}</CardTitle>
                  <CardDescription>{day.exercises.length} exercises</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {day.exercises.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ex.name}</span>
                      <Badge variant="secondary">{ex.category}</Badge>
                    </div>
                    <ExerciseDescription name={ex.name} />
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <span><span className="font-medium text-zinc-700 dark:text-zinc-300">Sets:</span> {ex.sets}</span>
                        <span><span className="font-medium text-zinc-700 dark:text-zinc-300">Target:</span> {ex.target}</span>
                        <span><span className="font-medium text-zinc-700 dark:text-zinc-300">Load:</span> {ex.load}</span>
                        <span><span className="font-medium text-zinc-700 dark:text-zinc-300">Rest:</span> {ex.rest}s</span>
                      </div>
                      {ex.notes && (
                        <p className="mt-1 text-xs italic text-zinc-400 dark:text-zinc-500">
                          {ex.notes}
                        </p>
                      )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
