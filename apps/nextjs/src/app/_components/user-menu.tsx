"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import type { Session } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

interface Props {
  user: Session;
}

export const UserMenu = ({ user }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative mt-1 h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.user.image ?? ""}
              alt="User profile picture"
            />
            <AvatarFallback>
              {user.user.name?.[0] ?? user.user.name?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user.user.image ?? ""}
                alt="User profile picture"
              ></AvatarImage>
              <AvatarFallback>
                {user.user.name?.[0] ?? user.user.name?.[0] ?? ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.user.name ?? user.user.name ?? ""}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.user.email ?? user.user.email ?? ""}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => setTheme("light")}
              >
                <div className="flex items-center">
                  <Sun className="mr-2 size-4" />
                  Light
                </div>
                {theme === "light" ? (
                  <span className="h-2 w-2 rounded-lg bg-primary"></span>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => setTheme("dark")}
              >
                <div className="flex items-center">
                  <Moon className="mr-2 size-4" />
                  Dark
                </div>
                {theme === "dark" ? (
                  <span className="h-2 w-2 rounded-lg bg-primary"></span>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => setTheme("system")}
              >
                <div className="flex items-center">
                  <Laptop className="mr-2 size-4" />
                  System
                </div>
                {theme === "system" ? (
                  <span className="h-2 w-2 rounded-lg bg-primary"></span>
                ) : null}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectTo: "/explore" })}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
