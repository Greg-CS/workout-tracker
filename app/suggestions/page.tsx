"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserData } from "@/lib/useUserData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Loader2, Send } from "lucide-react";

export default function SuggestionsPage() {
  const { user, userData, isLoaded } = useUserData();
  const sendSuggestion = useAction(api.emails.sendSuggestionEmail);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="mx-auto max-w-xl p-6">
        <p>Please sign in to send a suggestion.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const result = await sendSuggestion({
        fromName: userData.name ?? user.fullName ?? "Anonymous",
        fromEmail: userData.email ?? user.primaryEmailAddress?.emailAddress ?? "",
        message: message.trim(),
      });

      if (result.success) {
        setSent(true);
        setMessage("");
      } else {
        alert("Failed to send suggestion.");
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold tracking-tight">Suggestions</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Send feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <p className="text-foreground/70">Thanks for your suggestion!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground/50" htmlFor="fromEmail">
                  From
                </label>
                <Input
                  id="fromEmail"
                  value={userData.email ?? user.primaryEmailAddress?.emailAddress ?? ""}
                  disabled
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what we can improve..."
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-secondary/30 bg-white px-3 py-2 text-sm placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 dark:border-foreground/10 dark:bg-foreground/5"
                />
              </div>
              <Button type="submit" disabled={sending || !message.trim()}>
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="mr-1 h-4 w-4" /> Send
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
