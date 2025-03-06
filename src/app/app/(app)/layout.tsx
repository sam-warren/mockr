import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, HelpCircle, MessageSquare, Search } from "lucide-react";

export default function AppLayout({
  children,
  breadcrumbs,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-6 w-[1px] bg-border" />
            {breadcrumbs}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-40 lg:w-64 max-w-sm hidden sm:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive">
                  <span className="text-[10px] text-destructive-foreground">3</span>
                </Badge>
              </Button>

              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </Button>

              <Separator orientation="vertical" className="h-6 mx-1" />

              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 h-8"
              >
                <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-md font-medium">
                  Beta
                </span>
                <span>Upgrade</span>
              </Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
