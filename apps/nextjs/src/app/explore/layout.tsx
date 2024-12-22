import { auth } from "@acme/auth";

import { ExploreNavbar } from "../_components/explore-navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();

  return (
    <>
      <ExploreNavbar user={user} />
      {children}
    </>
  );
};

export default Layout;
