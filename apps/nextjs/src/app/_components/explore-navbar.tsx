import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Session } from "@acme/auth";
import { buttonVariants } from "@acme/ui/button";

import { CreateButton } from "./create-button";
import { NotificationMenu } from "./notification-menu";
import { SearchForm } from "./search-form";
import { UserMenu } from "./user-menu";

interface Props {
  user: Session | null;
}

export const ExploreNavbar = ({ user }: Props) => {
  return (
    <nav className="absolute inset-x-0 top-0 z-50 h-16 border-b">
      <div className="flex items-center justify-between p-3 lg:px-8">
        <div className="flex items-center space-x-5 lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Christmas Lights App</span>
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="logo"
              className="h-12 w-12"
            />
          </Link>
          <Link
            href="/explore"
            className={buttonVariants({
              size: "sm",
              className: "flex items-center gap-1",
              variant: "ghost",
            })}
          >
            Explore
          </Link>
        </div>
        <SearchForm />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-5">
          {user ? (
            <>
              <CreateButton />
              <NotificationMenu />
              <UserMenu user={user} />
            </>
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1.5",
              })}
            >
              Login <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
