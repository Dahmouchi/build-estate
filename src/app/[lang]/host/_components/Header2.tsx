/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { redirect, usePathname, useRouter } from "next/navigation";
import { NavUser } from "./nav-user";
import {
  AlertCircle,
  Archive,
  Bell,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  FolderLock,
  House,
  KeySquare,
  LayoutDashboard,
  Settings2,
  SwatchBook,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
const navMain = [
  {
    title: "Accueil",
    url: "overview",
    icon: House,
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
  },
  {
    title: "Users Archive",
    url: "archive",
    icon: Archive,
  },
  {
    title: "Alertes",
    url: "alertes",
    icon: AlertCircle,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings2,
  },
];

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  relatedId: string;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
}
const Header = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "Home"; // Extract last segment
  const { data: session, update } = useSession();
  const page = navMain.find((cat) => cat.url === lastSegment);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Filter unread notifications or limit to 5

  const [unreadNewslettersCount, setUnreadNewslettersCount] = useState(0);


  function formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 ">
  {/* Left section: breadcrumb */}
  <div className="flex items-center gap-3 bg-white rounded-lg py-2 shadow px-4">
    <SidebarTrigger className="cursor-pointer text-slate-800 " />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-slate-800 ">
            Arab BNB
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-500" />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-slate-800">{page?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>

  {/* Right section: notifications + user */}
  <div className="flex items-center gap-4">
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-slate-700/50">
          <Bell className="h-5 w-5 text-white" />
          {unreadNewslettersCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#244B35] text-white"
            >
              {unreadNewslettersCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      {/* DropdownContent stays same */}
    </DropdownMenu>

    {session?.user ? (
      <NavUser />
    ) : (
      <Button
        onClick={() => redirect("/user")}
        className="gap-2.5 px-6 bg-gradient-to-r from-[#244B35] to-[#f76e19] text-white rounded-full shadow-md"
      >
        <KeySquare /> S&apos;Identifier
      </Button>
    )}
  </div>
</header>

  );
};

export default Header;
