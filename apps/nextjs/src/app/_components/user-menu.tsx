"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import type { Session } from "@acme/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { ThemeChange } from "./theme-change";

interface Props {
  user: Session;
}

export const UserMenu = ({ user }: Props) => {
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
        <DropdownMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <ThemeChange />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirectTo: "/explore" })}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
