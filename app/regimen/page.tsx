"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Loader2, Download, FileText } from "lucide-react";
import { templates } from "@/lib/templates";
import { RegimenView } from "@/components/organism/RegimenView";
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
            headStyles: { fillColor: [8, 135, 50] },
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
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!regimen) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="mb-4 h-10 w-10 text-foreground/20" />
            <p className="mb-2 text-lg font-medium">No regimen yet</p>
            <p className="mb-4 text-sm text-foreground/50">
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{template?.name ?? "Your"} Regimen</h1>
          <p className="mt-2 text-sm text-foreground/50">
            {regimen.days.length}-day training plan
          </p>
        </div>
        <Button onClick={handleDownloadPDF}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="space-y-4">
        <RegimenView days={regimen.days} userEquipment={userData?.equipmentProfile} />
      </div>
    </div>
  );
}
