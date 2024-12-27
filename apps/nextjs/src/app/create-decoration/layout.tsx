import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default Layout;
