import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { SignInForm } from "./sign-in-form";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/explore");
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <SignInForm />
      </div>
    </>
  );
};
export default SignInPage;
