"use client";

import * as React from "react";
import {
  BookOpen,
  Database,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  FileJson,
  TableProperties,
  LayoutTemplate,
  History,
  Download,
  GitBranch,
  Code,
} from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavProjects } from "@/components/layout/sidebar/nav-projects";
import { NavSecondary } from "@/components/layout/sidebar/nav-secondary";
import { NavUser } from "@/components/layout/sidebar/nav-user";
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
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
    },
    {
      title: "Schema Builder",
      url: "/schema-builder",
      icon: TableProperties,
      items: [
        {
          title: "My Schemas",
          url: "/schemas",
        },
        {
          title: "Create New",
          url: "/schemas/new",
        },
        {
          title: "Templates",
          url: "/schemas/templates",
        },
      ],
    },
    {
      title: "Data Generation",
      url: "/data-generation",
      icon: Database,
      items: [
        {
          title: "Generate",
          url: "/generate",
        },
        {
          title: "History",
          url: "/history",
        },
        {
          title: "Scheduled Jobs",
          url: "/scheduled",
        },
      ],
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: GitBranch,
      items: [
        {
          title: "Supabase",
          url: "/integrations/supabase",
        },
        {
          title: "PostgreSQL",
          url: "/integrations/postgres",
        },
        {
          title: "MongoDB",
          url: "/integrations/mongodb",
        },
        {
          title: "REST API",
          url: "/integrations/rest-api",
        },
      ],
    },
    {
      title: "API Endpoints",
      url: "/api",
      icon: Code,
      items: [
        {
          title: "Your Endpoints",
          url: "/api/endpoints",
        },
        {
          title: "Documentation",
          url: "/api/docs",
        },
        {
          title: "Usage Stats",
          url: "/api/usage",
        },
      ],
    },
    {
      title: "Export Options",
      url: "/export",
      icon: Download,
      items: [
        {
          title: "JSON",
          url: "/export/json",
        },
        {
          title: "CSV",
          url: "/export/csv",
        },
        {
          title: "SQL",
          url: "/export/sql",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "API Keys",
          url: "/settings/api-keys",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Recent Schemas",
      url: "/schemas/recent",
      icon: FileJson,
    },
    {
      name: "Template Library",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      name: "Generation History",
      url: "/history",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Database className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold font-mono">
                    {"{mockr}"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Data Generator
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
