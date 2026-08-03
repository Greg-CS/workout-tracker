import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-secondary/10 via-white to-primary/5 dark:from-foreground/5 dark:via-background dark:to-primary/10">
      <SignIn />
    </div>
  );
}
