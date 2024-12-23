import { SidebarTrigger } from "@acme/ui/sidebar";

import { CreateButton } from "../_components/create-button";
import { NotificationMenu } from "../_components/notification-menu";

export const DashboardNavbar = () => {
  return (
    <nav className="border-b p-4">
      <div className="flex items-center justify-between">
        <SidebarTrigger />
        <div className="flex items-center gap-4">
          <CreateButton />
          <NotificationMenu />
        </div>
      </div>
    </nav>
  );
};
