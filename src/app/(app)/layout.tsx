export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
