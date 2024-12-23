"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@acme/ui/dropdown-menu";

export const ThemeChange = () => {
  const { theme, setTheme } = useTheme();

  return (
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
  );
};
