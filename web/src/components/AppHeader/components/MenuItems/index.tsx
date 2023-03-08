import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { User } from "../../../../lib/types";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  { title: "Decoration", route: "/decorations" },
  { title: "Settings", route: "/settings" },
];

interface Props {
  user: User | undefined;
}

export const MenuItems: React.FC<Props> = ({ user }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          <>
            <span className="flex items-center py-2 px-4 text-sm font-semibold text-ch-indigo">
              <Link to="/">
                <img
                  src={user?.image}
                  alt="profile"
                  className="w-12 h-12 rounded-full mr-3"
                />
              </Link>
              {user?.name}
            </span>
            <hr className="w-5/6 m-auto" />
          </>
        </Menu.Item>
        {items.map((item) => (
          <Menu.Item key={item.title}>
            {({ active }) => (
              <Link to="/">
                <span
                  className={classNames(
                    active ? "bg-gray-200" : "",
                    "block my-1 mx-3 py-2 px-4 text-sm text-ch-indigo rounded-lg"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  );
};
