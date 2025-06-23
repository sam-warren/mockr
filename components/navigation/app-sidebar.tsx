"use client";

import {
  IconDashboard,
  IconFoldersFilled,
  IconHelp,
  IconTemplate,
} from "@tabler/icons-react";
import * as React from "react";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/navigation/nav-main";
import { NavSecondary } from "@/components/navigation/nav-secondary";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "Sam Warren",
    email: "sam@mockr.io",
    avatar: "/avatars/sam.jpg",
  },
  navSecondary: [
    {
      title: "Get Help",
      url: "https://github.com/sam-warren/mockr/issues",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      title: "My Mocks",
      url: "/mocks",
      icon: IconFoldersFilled,
      isActive: pathname === "/mocks",
    },
    {
      title: "Templates",
      url: "/templates",
      icon: IconTemplate,
      isActive: pathname === "/templates",
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 justify-center"
            >
              <Link href="/">
                <span className="text-base font-semibold font-mono">
                  {"{mockr.io}"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
