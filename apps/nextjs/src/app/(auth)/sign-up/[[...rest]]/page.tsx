import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { SignUpForm } from "./sign-up-form";

const SignUpPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;
