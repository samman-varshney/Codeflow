import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import { useAuth } from "../context/AuthContext";
import {
  IconBrandGithub,
  IconHome,
  IconSparkles,
  IconBookmark,
  IconLogin,
  IconLogout,
  IconUserPlus,
} from "@tabler/icons-react";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  const baseLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Generate",
      icon: <IconSparkles className="h-full w-full text-purple-400" />,
      href: "/prompt",
    },
  ];

  let authLinks = [];
  if (isAuthenticated) {
    authLinks = [
      {
        title: "Saved",
        icon: <IconBookmark className="h-full w-full text-[#e40b7f]" />,
        href: "/saved",
      },
      {
        title: user?.name ? `Logout (${user.name})` : "Logout",
        icon: <IconLogout className="h-full w-full text-red-400" />,
        href: "#logout",
        onClick: (e) => {
          e.preventDefault();
          logout();
        },
      },
    ];
  } else {
    authLinks = [
      {
        title: "Login",
        icon: <IconLogin className="h-full w-full dark:text-neutral-300" />,
        href: "/login",
      },
      {
        title: "Sign Up",
        icon: <IconUserPlus className="h-full w-full text-purple-400" />,
        href: "/signup",
      },
    ];
  }

  const links = [
    ...baseLinks,
    ...authLinks,
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full dark:text-neutral-300" />,
      href: "https://github.com/YuviX-514/codeFlow",
    },
  ];

  return <FloatingDock items={links} />;
}
