import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name, templateName, regimenSummary } = await req.json();

    if (!email || !templateName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Gym snooze <noreply@resend.dev>",
      to: email,
      subject: `Your ${templateName} regimen is ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Your ${templateName} regimen is set!</h1>
          <p>Hi ${name},</p>
          <p>You've successfully selected the <strong>${templateName}</strong> training template. Here's a summary of your weekly plan:</p>
          <pre style="background: #f4f4f5; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 14px;">${regimenSummary}</pre>
          <p>Head over to your <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard">dashboard</a> to start training.</p>
          <p>Stay consistent!<br />The Gym snooze Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
