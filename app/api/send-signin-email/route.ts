import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Workout Tracker <noreply@resend.dev>",
      to: email,
      subject: `Welcome back, ${name ?? "Athlete"}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Welcome back!</h1>
          <p>Hi ${name ?? "Athlete"},</p>
          <p>You've signed in to Workout Tracker. Time to get moving!</p>
          <p>Head over to your <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard">dashboard</a> to check today's workout.</p>
          <p>Stay consistent!<br />The Workout Tracker Team</p>
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
