import { FloatingDock } from "@/components/molecules/floating-dock";
import {
  Home,
  LayoutDashboard,
  Dumbbell,
  ClipboardList,
  History,
  Users,
  Trophy,
} from "lucide-react";

const dockItems = [
  {
    title: "Home",
    icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/dashboard",
  },
  {
    title: "Templates",
    icon: <Dumbbell className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/templates",
  },
  {
    title: "Log",
    icon: <ClipboardList className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/log",
  },
  {
    title: "History",
    icon: <History className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/history",
  },
  {
    title: "Users",
    icon: <Users className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/users",
  },
  {
    title: "Leaderboard",
    icon: <Trophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/leaderboard",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-28">
      {children}
      <FloatingDock
        desktopClassName="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        mobileClassName="fixed bottom-6 right-6 z-40"
        items={dockItems}
      />
    </div>
  );
}
