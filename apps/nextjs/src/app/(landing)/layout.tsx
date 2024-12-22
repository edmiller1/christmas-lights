import type { ReactNode } from "react";

import { auth } from "@acme/auth";

import { Navbar } from "../_components/navbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await auth();
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
};

export default Layout;
