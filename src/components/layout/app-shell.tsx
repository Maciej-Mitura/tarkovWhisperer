import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <AppSidebar className="fixed inset-y-0 left-0" />
      </div>

      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
        <AppTopbar title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
