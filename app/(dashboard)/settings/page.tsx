"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserData } from "@/lib/useUserData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { user, userData, isLoaded } = useUserData();
  const updateName = useMutation(api.users.updateName);
  const [name, setName] = useState(userData?.name ?? "");
  const [saving, setSaving] = useState(false);

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
        <p>Please sign in to view settings.</p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await updateName({ clerkId: user.id, name: name.trim() });
      alert("Name updated.");
    } catch (err) {
      alert("Failed to update name.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">
                Username / Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground/50" htmlFor="email">
                Email
              </label>
              <Input id="email" value={userData.email ?? ""} disabled />
            </div>
            <Button type="submit" disabled={saving || name === userData.name}>
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
