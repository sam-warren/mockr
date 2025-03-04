import Link from "next/link";
import { LayoutDashboard, Settings, Database, Activity, Users } from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-64 bg-background border-r h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1">
        <SidebarLink href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/mocks" icon={<Database className="h-5 w-5" />}>
          Mocks
        </SidebarLink>
        <SidebarLink href="/analytics" icon={<Activity className="h-5 w-5" />}>
          Analytics
        </SidebarLink>
        <SidebarLink href="/team" icon={<Users className="h-5 w-5" />}>
          Team
        </SidebarLink>
        <SidebarLink href="/settings" icon={<Settings className="h-5 w-5" />}>
          Settings
        </SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({ 
  href, 
  icon, 
  children 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
} 