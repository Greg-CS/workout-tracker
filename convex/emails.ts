import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendReminderEmail = action({
  args: {
    to: v.string(),
    name: v.string(),
    templateName: v.string(),
    todayWorkout: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Gym snooze <noreply@yourdomain.com>",
      to: args.to,
      subject: `Welcome back, ${args.name}! Here's your workout for today`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #333;">Welcome back, ${args.name}!</h1>
          <p style="color: #666; font-size: 16px;">Here's a quick reminder of your current regimen:</p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #333;">Current Regimen: ${args.templateName}</p>
            <p style="margin: 0; color: #555;">Today's focus: ${args.todayWorkout}</p>
          </div>
          <a href="https://your-app-domain.com/log" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Start Today's Workout</a>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">You're receiving this because you signed in to Gym snooze.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  },
});

export const sendRegimenConfirmationEmail = action({
  args: {
    to: v.string(),
    name: v.string(),
    templateName: v.string(),
    regimenSummary: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Gym snooze <noreply@yourdomain.com>",
      to: args.to,
      subject: `Your ${args.templateName} regimen is ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #333;">Your ${args.templateName} regimen is set up!</h1>
          <p style="color: #666; font-size: 16px;">Great choice, ${args.name}. Here's a summary of your 7-day plan:</p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 16px 0; white-space: pre-line; color: #555;">
            ${args.regimenSummary}
          </div>
          <a href="https://your-app-domain.com/regimen" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Full Regimen</a>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">You're receiving this because you selected a workout template on Gym snooze.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  },
});

export const sendSuggestionEmail = action({
  args: {
    fromName: v.string(),
    fromEmail: v.string(),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Gym snooze <noreply@yourdomain.com>",
      to: "gregor.rodriguez@digital-sunsets.com",
      replyTo: args.fromEmail,
      subject: `Gym snooze suggestion from ${args.fromName}`,
      text: args.message,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #333;">New Gym snooze suggestion</h1>
          <p style="color: #666; font-size: 16px;">From: ${args.fromName} (${args.fromEmail})</p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 16px 0; white-space: pre-line; color: #555;">
            ${args.message.replace(/\n/g, "<br />")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  },
});
