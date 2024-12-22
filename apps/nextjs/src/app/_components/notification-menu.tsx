"use client";

import { useState } from "react";
import { Bell, Check, MoreVertical, Trash, Undo } from "lucide-react";

import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@acme/ui/popover";
import { ScrollArea } from "@acme/ui/scroll-area";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export const NotificationMenu = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New message",
      description: "You have a new message from John",
      timestamp: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Calendar event",
      description: "Meeting with team at 3 PM",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Profile update",
      description: "Your profile has been updated successfully",
      timestamp: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "New follower",
      description: "Jane Doe started following you",
      timestamp: "1 day ago",
      read: true,
    },
  ]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="absolute right-2 top-1 h-3 w-3 rounded-full border-2 border-background bg-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-10 w-80">
        <h3 className="mb-2 text-lg font-semibold">Notifications</h3>
        <ScrollArea className="h-[300px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-2 flex items-start justify-between rounded-md p-3 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex-grow cursor-pointer">
                <div className="flex items-center">
                  {!notification.read && (
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-red-500"
                      aria-hidden="true"
                    />
                  )}
                  <h4 className="font-medium">{notification.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {notification.timestamp}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {notification.read ? (
                    <DropdownMenuItem>
                      <Undo className="mr-2 h-4 w-4" />
                      <span>Mark as unread</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Mark as read</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
