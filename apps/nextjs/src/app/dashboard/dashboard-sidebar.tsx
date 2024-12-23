"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Sparkles } from "lucide-react";

import { Session } from "@acme/auth";
import { cn } from "@acme/ui";
import { buttonVariants } from "@acme/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@acme/ui/sidebar";

import { SidebarUserMenu } from "./sidebar-user-menu";

interface Props {
  user: Session | null;
}

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const sidebarItems: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Sparkles, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
];

export const DashboardSidebar = ({ user }: Props) => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            className="h-12 w-12"
          />
          <p className="font-semibold">Christmas Lights App</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(({ category, items }) => (
                <div key={category} className="mb-4 md:mb-8">
                  <p className="text-sm font-medium leading-6 text-zinc-500">
                    {category}
                  </p>
                  <div>
                    {items.map((item, i) => (
                      <SidebarMenuItem key={i}>
                        <Link
                          href={item.href}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "group flex w-full items-center justify-start gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6",
                            {
                              "bg-sidebar-accent text-sidebar-accent-foreground":
                                pathname === item.href,
                            },
                          )}
                        >
                          <item.icon className="size-4" />
                          {item.text}
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </div>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
