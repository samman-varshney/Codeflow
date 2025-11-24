import React, { useState } from "react";
import { FloatingDock } from "./ui/floating-dock";

import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconTerminal2,
  IconUser,
  IconLogin,
} from "@tabler/icons-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const [open, setOpen] = useState(false);

  const baseLinks = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Products",
      icon: <IconTerminal2 className="h-full w-full dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full dark:text-neutral-300" />,
      href: "https://github.com/samman-varshney/Codeflow",
    },
  ];

  const authButton = isSignedIn
    ? {
        title: "Profile",
        icon: (
          <div className="relative">
            <IconUser
              onClick={() => setOpen((o) => !o)}
              className="h-full w-full cursor-pointer dark:text-neutral-300"
            />

            {open && (
              <div className="absolute right-0 top-10 bg-[#111] border border-white/10 rounded-lg shadow-lg w-40 p-2 z-[9999]">
                <a
                  href="/profile"
                  className="block px-3 py-2 text-white/90 hover:bg-white/10 rounded-md"
                >
                  View Profile
                </a>
                <button
                  onClick={() => signOut(() => (window.location = "/"))}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ),
        href: "#",
      }
    : {
        title: "Login",
        icon: (
          <SignInButton redirectUrl="/prompt">
            <IconLogin className="h-full w-full cursor-pointer dark:text-neutral-300" />
          </SignInButton>
        ),
        href: "#",
      };

  return (
    <div className="fixed top-0 w-full flex items-center justify-center px-6 py-4 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <FloatingDock items={[...baseLinks, authButton]} />
    </div>
  );
}