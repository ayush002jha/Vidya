
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
  } from "@tabler/icons-react";
  import Image from "next/image";
  
export const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300 " />,
      href: "/",
    },
  
    {
      title: "Q&A",
      icon: <IconTerminal2 className="h-full w-full text-neutral-300 " />,
      href: "9d25f43d-3644-490e-bb1d-8a6bb2a35d08",
    },
    {
      title: "YTVideoSummarizer",
      icon: <IconNewSection className="h-full w-full text-neutral-300 " />,
      href: "ec62ea72-cb10-430e-8b49-64b852d08812",
    },
    {
      title: "ResearchAssist",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "7119bf6f-b8e1-4f1a-8b85-711ff8496ed9",
    },
    {
      title: "DigiNotes",
      icon: <IconExchange className="h-full w-full text-neutral-300 " />,
      href: "fe7ddfe6-79b0-486d-817f-f68937facf05",
    },
  
    {
      title: "Doubtnut",
      icon: <IconBrandX className="h-full w-full text-neutral-300 " />,
      href: "38ff4010-21b2-4f81-8da2-fcd9b54aee05",
    },
  ];
  