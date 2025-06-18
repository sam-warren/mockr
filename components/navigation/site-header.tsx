import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
      </div>
    </header>
  );
}
