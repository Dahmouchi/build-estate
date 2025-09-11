/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import type * as React from "react";
import {
  House,
  BellElectric,
  Settings2,
  Users,
  SwatchBook,
  Tickets,
  PlaneTakeoff,
  Newspaper,
  ListStart,
  Star,
  MessagesSquare,
  Route,
  Headset,
  ListOrdered,
  StarHalf,
  Sparkle,
  Sparkles,
  Key,
  Shapes,
  LibraryBig,
  BookText,
  Boxes,
  Box,
  Search,
} from "lucide-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { title } from "process";
import { Input } from "@/components/ui/input";

// This is sample data.
const datas = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Alert Application",
      logo: BellElectric,
      plan: "Dark Mode",
    },
  ],
  navMain: [
    {
      title: "Accueil",
      url: "/host/dashboard",
      icon: House,
    },
    {
      title: "Les Publicité",
      url: "/host/dashboard/publicite",
      icon: Boxes,
    },
    {
      title: "Ajouter Publicité",
      url: "/host/dashboard/publicite/add",
      icon: Box,
    },
    {
      title: "Settings",
      url: "/host/dashboard/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
   <Sidebar collapsible="icon" {...props} className="bg-white dark:bg-slate-800 p-2 flex flex-col items-center justify-center bg ">
      <SidebarHeader className="dark:bg-slate-900 flex items-center bg-white justify-center rounded-t-xl ">
        <Image src={`${state === "expanded" ? '/images/logov1.png':'/images/logov2.png'}`} alt="logo" width={state === "expanded" ? 300 : 500 } height={state === "expanded" ? 200 : 500 }/>
     
      </SidebarHeader>
      <SidebarContent className="dark:bg-slate-900 pl-0 bg-white rounded-b-xl mt-3">
        <div className={`px-3 py-2 ${state === "expanded" ? '':'hidden'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div> 
        <NavMain items={datas.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
