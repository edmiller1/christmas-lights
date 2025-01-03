import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const user = session?.user;

  if (!user) {
    redirect("/welcome");
  }

  return (
    <>
      <h1 className="font-semiboldz text-4xl">Dashboard</h1>
    </>
  );
};

export default DashboardPage;
