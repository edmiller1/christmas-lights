import { auth } from "@acme/auth";
import { SidebarProvider } from "@acme/ui/sidebar";

import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar user={user} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardNavbar />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
