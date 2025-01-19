"use client"

import React from 'react';
import Link from 'next/link';
import { HomeIcon, HelpCircleIcon, VideoIcon, BookOpenIcon, PenToolIcon, GraduationCapIcon } from 'lucide-react';
import { useTab } from '@/providers/tabs-provider';

const links = [
  {
    title: "Home",
    icon: <HomeIcon className="h-full w-full" />,
    href: "/",
    useCase: "🏠 Where can I find an overview of all features?",
  },
  {
    title: "Q&A",
    icon: <HelpCircleIcon className="h-full w-full" />,
    href: "9d25f43d-3644-490e-bb1d-8a6bb2a35d08",
    useCase: "❓ How can I get instant answers to my questions?",
  },
  {
    title: "YTVideoSummarizer",
    icon: <VideoIcon className="h-full w-full" />,
    href: "ec62ea72-cb10-430e-8b49-64b852d08812",
    useCase: "🎥 Can you summarize this YouTube video for me?",
  },
  {
    title: "ResearchAssist",
    icon: <BookOpenIcon className="h-full w-full" />,
    href: "7119bf6f-b8e1-4f1a-8b85-711ff8496ed9",
    useCase: "🔬 How can AI help with my research paper?",
  },
  {
    title: "DigiNotes",
    icon: <PenToolIcon className="h-full w-full" />,
    href: "fe7ddfe6-79b0-486d-817f-f68937facf05",
    useCase: "📝 Can you convert my handwritten notes to digital format?",
  },
  {
    title: "Doubtnut",
    icon: <GraduationCapIcon className="h-full w-full" />,
    href: "38ff4010-21b2-4f81-8da2-fcd9b54aee05",
    useCase: "📚 How can I get step-by-step solutions for my homework?",
  },
];

const FeatureShowcase: React.FC = () => {
  const { selectedTab, updateSelectedTab } = useTab();

  return (
    <div className=" min-h-[85dvh] py-24 font-minecraft z-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">Explore Our Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="block group" onClick={()=>updateSelectedTab(link.title)}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out h-full border border-gray-700 group-hover:border-blue-500 group-hover:shadow-2xl">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 mr-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {link.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{link.title}</h2>
                  </div>
                  <p className="text-gray-300 mb-6 flex-grow">{link.useCase}</p>
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mt-auto">
                    Learn more <span className="group-hover:ml-1 transition-all duration-300">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;

