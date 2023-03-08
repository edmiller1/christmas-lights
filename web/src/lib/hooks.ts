import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  //@ts-ignore
  const [currentUser] = useAuthState(auth);

  return currentUser;
}
