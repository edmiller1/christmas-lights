import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOG_IN } from "../../graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../graphql/mutations/login/types";
import {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
} from "../../lib/firebase";
import { useUserData } from "../../lib/hooks";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaGithub,
  FaApple,
  FaMicrosoft,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [logIn, { data: LogInData, loading: logInLoading, error: logInError }] =
    useMutation<LogInData, LogInVariables>(LOG_IN, {
      onCompleted: (data) => {
        if (data && data.logIn) {
          toast.success("Logged In Successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error("Failed to Log In. Try again.");
        }
      },
    });

  const logInWithGoogle = async () => {
    await auth
      .signInWithPopup(googleAuthProvider)
      .then((googleData: any) => {
        const resultData: LogInVariables = {
          input: {
            result: {
              uid: googleData.user.uid,
              isNewUser: googleData.additionalUserInfo.isNewUser,
              accessToken: googleData.credential.idToken,
              displayName: googleData.user.displayName,
              email: googleData.user.email,
              photoURL: googleData.user.photoURL,
              providerId: googleData.user.providerData[0].providerId,
              createdAt: googleData.user.metadata.creationTime,
            },
          },
        };
        logIn({ variables: { input: resultData.input } });
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error: Error) => {
        toast.error("Failed to Log In. Try again.");
      });
  };

  return (
    <>
      {/* background image */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <img alt="Christmas House" src="/house.png" className="h-[18rem]" />
        <div
          aria-label="sign in form"
          className="h-[18rem] w-[30rem] rounded-lg border bg-white shadow-lg"
        >
          <div>
            <span className="mt-8 flex justify-center text-gray-500">
              Sign in with
            </span>
          </div>
          <div className="flex flex-col">
            <div className="mt-5 flex justify-between">
              <button
                onClick={logInWithGoogle}
                className="ml-5 mr-2 flex w-1/2 items-center justify-center rounded-lg border py-2 px-2 text-lg text-gray-500 hover:bg-gray-100"
              >
                <FaGoogle className="mr-2" />
                Google
              </button>
              <button className="mr-5 ml-2 flex w-1/2 items-center justify-center rounded-lg border py-2 px-2 text-lg text-gray-500 hover:bg-gray-100">
                <FaFacebook className="mr-2" />
                Facebook
              </button>
            </div>
            <div className="mt-5 flex justify-between">
              <button className="ml-5 mr-2 flex w-1/2 items-center justify-center rounded-lg border py-2 px-2 text-lg text-gray-500 hover:bg-gray-100">
                <FaGithub className="mr-2" />
                Github
              </button>
              <button className="mr-5 ml-2 flex w-1/2 items-center justify-center rounded-lg border py-2 px-2 text-lg text-gray-500 hover:bg-gray-100">
                <FaMicrosoft className="mr-2" />
                Microsoft
              </button>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-[18rem] text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              to="/info/terms-of-service"
              className="text-ch-orange hover:text-ch-orange"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/info/privacy-policy"
              className="text-ch-orange hover:text-ch-orange"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};
