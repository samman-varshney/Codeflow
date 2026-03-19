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

export default function Navbar() {

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

  

  return (
    <div className="fixed top-0 w-full flex items-center justify-center px-6 py-4 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <FloatingDock items={[...baseLinks]} />
    </div>
  );
}