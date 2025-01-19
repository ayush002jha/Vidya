import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Dock } from "@/components/Dock";
import TabProvider from "@/providers/tabs-provider";
import { BackgroundLines } from "@/components/ui/background-lines";

import { HomeIcon, HelpCircleIcon, VideoIcon, BookOpenIcon, PenToolIcon, GraduationCapIcon } from 'lucide-react';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vidya",
  description: "Personalized AI Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabProvider>
          <BackgroundLines className=" bg-neutral-950 p-6  min-h-screen   font-[family-name:var(--font-geist-sans)]">

            <Dock links={links} />

            {children}

          </BackgroundLines>
        </TabProvider>
      </body>
    </html>
  );
}

export const links = [
  {
    title: "Home",
    icon: <HomeIcon className="h-full w-full text-neutral-200" />,
    href: "/",
    useCase: "🏠 Where can I find an overview of all features?",
  },
  {
    title: "Q&A",
    icon: <HelpCircleIcon className="h-full w-full text-neutral-200" />,
    href: "9d25f43d-3644-490e-bb1d-8a6bb2a35d08",
    useCase: "❓ How can I get instant answers to my questions?",
  },
  {
    title: "YTVideoSummarizer",
    icon: <VideoIcon className="h-full w-full text-neutral-200" />,
    href: "ec62ea72-cb10-430e-8b49-64b852d08812",
    useCase: "🎥 Can you summarize this YouTube video for me?",
  },
  {
    title: "ResearchAssist",
    icon: <BookOpenIcon className="h-full w-full text-neutral-200" />,
    href: "7119bf6f-b8e1-4f1a-8b85-711ff8496ed9",
    useCase: "🔬 How can AI help with my research paper?",
  },
  {
    title: "DigiNotes",
    icon: <PenToolIcon className="h-full w-full text-neutral-200" />,
    href: "fe7ddfe6-79b0-486d-817f-f68937facf05",
    useCase: "📝 Can you convert my handwritten notes to digital format?",
  },
  {
    title: "Doubtnut",
    icon: <GraduationCapIcon className="h-full w-full text-neutral-200" />,
    href: "38ff4010-21b2-4f81-8da2-fcd9b54aee05",
    useCase: "📚 How can I get step-by-step solutions for my homework?",
  },
];