"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, useUser } from "@clerk/nextjs";
import { ConvexReactClient, useConvexAuth, useMutation } from "convex/react";
import { ReactNode, useEffect, useRef } from "react";
import { api } from "../convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <UserSync>{children}</UserSync>
    </ConvexProviderWithClerk>
  );
}

function UserSync({ children }: { children: ReactNode }) {
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);
  const hasSynced = useRef(false);
  const emailSent = useRef(false);

  useEffect(() => {
    if (!authLoading && userLoaded && isAuthenticated && user && !hasSynced.current) {
      hasSynced.current = true;
      getOrCreateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? user.username ?? "Athlete",
      }).catch(console.error);

      if (!emailSent.current) {
        emailSent.current = true;
        fetch("/api/send-signin-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName ?? "Athlete",
          }),
        }).catch(() => {});
      }
    }
    if (!isAuthenticated) {
      hasSynced.current = false;
      emailSent.current = false;
    }
  }, [authLoading, userLoaded, isAuthenticated, user, getOrCreateUser]);

  return <>{children}</>;
}
