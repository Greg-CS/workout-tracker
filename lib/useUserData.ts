import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useUserData() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(
    api.users.getUser,
    user?.id ? { clerkId: user.id } : "skip",
  );

  return {
    user,
    userData,
    isLoaded: userLoaded && userData !== undefined,
  };
}
