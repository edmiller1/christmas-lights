import React, { useState, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bell, UserCircle, MagnifyingGlass, HouseLine } from "phosphor-react";
import { User } from "../../lib/types";
import { MenuItems } from "./components";
import { CreateModal } from "../CreateModal";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  user: User | undefined;
}

export const AppHeader: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);

  return (
    <div className="bg-white">
      <CreateModal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        userId={user?.id}
      />
      <div className="px-32 py-3 h-24 border-b-[1px] lg:divide-y lg:divide-gray-200">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center cursor-pointer">
              <img
                className="block h-20 w-auto"
                src="/house.png"
                alt="logo"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlass size={16} color="#6b7280" weight="bold" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-ch-turqiouse focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-ch-turqiouse sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          {user ? (
            <div className="lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="flex items-center flex-shrink-0 mr-5 px-2 py-1 rounded-md text-ch-indigo border-2 border-ch-indigo transition-all hover:bg-ch-turqiouse focus:outline-none"
              >
                <HouseLine size={24} color="#040043" />
                <span className="font-semibold ml-2 mt-[0.1rem]">Create</span>
              </button>
              <button
                type="button"
                className="flex-shrink-0 mr-2 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <Bell size={24} color="#040043" weight="bold" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-4 flex-shrink-0">
                <div>
                  <Menu.Button className="flex rounded-full bg-white focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    {!user?.image ? (
                      <UserCircle size={48} color="#6b7280" weight="fill" />
                    ) : (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={user?.image}
                        alt="user profile"
                      />
                    )}
                  </Menu.Button>
                </div>
                <MenuItems user={user} />
              </Menu>
            </div>
          ) : (
            <div className="lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
              <button className="flex items-center flex-shrink-0 mr-5 px-2 py-1 rounded-md text-ch-indigo border-2 border-ch-indigo transition-all hover:bg-ch-turqiouse focus:outline-none">
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
