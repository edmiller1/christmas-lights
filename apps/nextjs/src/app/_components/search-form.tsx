import React from "react";
import { Search } from "lucide-react";

import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

export const SearchForm = ({ ...props }: React.ComponentProps<"form">) => {
  return (
    <form {...props} className="w-[28rem]">
      <div className="py-0">
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search for decorations..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </div>
      </div>
    </form>
  );
};
