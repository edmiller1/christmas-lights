import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { USER } from "../src/graphql/queries";
import { User as UserData, UserVariables } from "./graphql/queries/user/types";
import { UserContext } from "./lib/context";
import { useUserData } from "./lib/hooks";
import "./App.css";
import { AppHeader } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const currentUser = useUserData();

  const getCoords = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          "latitude",
          JSON.stringify(position.coords.latitude)
        );
        localStorage.setItem(
          "longitude",
          JSON.stringify(position.coords.longitude)
        );
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  const { data } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: currentUser?.uid,
    },
    skip: !currentUser,
  });

  return (
    <UserContext.Provider value={currentUser}>
      <AppHeader user={data?.user} />
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
