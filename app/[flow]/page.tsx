"use client";
import React, { useState } from "react";
import ChatWidget from "@/components/chatWidget";
import FileUploader from "@/components/FileUpload";
import { links } from "@/providers/tabs";
import { useTab } from "@/providers/tabs-provider";
import Image from "next/image";
import { Button } from "pixel-retroui";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
export default function Page({
  params,
}: {
  params: Promise<{ flow: string }>;
}) {
  const { flow } = React.use(params);
  const { filePath, updateFilePath } = useTab();
  const selectedTab = links.find((ele) => ele.href === flow);
  const dir = [
    {
      id: 1,
      path: "/",
    },
    {
      id: 2,
      path: "/home/ayushjha/Pictures/Notes",
    },
    {
      id: 3,
      path: "/home/ayushjha/Downloads",
    },
  ];

  const [chosenDir, setChosenDir] = useState<number>(2);

  const QnA_TWEAKS = {
    "File-y8w23": {
      path: filePath,
      concurrency_multithreading: 4,
      silent_errors: false,
      use_multithreading: false,
    },
  };

  const img_TWEAKS = {
    "TextInput-We8ef": {
      input_value: "/home/ayushjha/.cache/langflow/" + filePath,
    },
  };

  const TWEAKS = selectedTab?.title === "Doubtnut" ? img_TWEAKS : QnA_TWEAKS;

  return (
    <div className="grid grid-cols-4 ps-48 gap-6">
      <div className="col-span-3">
        <div className="flex gap-4 items-center justify-between">
          <div>
            <h1 className="text-4xl text-white font-minecraft font-bold ">
              VIDYA
            </h1>
            <h2 className="text-xl text-white font-minecraft underline underline-offset-4 ">
              Your AI-Powered Study Companion
            </h2>
          </div>
          <div className="text-white text-end text-sm z-50">
            <p className="me-4">Powered By</p>
            <Image
              src={"https://docs.langflow.org/img/langflow-logo-white.svg"}
              height={200}
              width={200}
              alt="langflow-logo"
            />
          </div>
        </div>

        <ChatWidget
          window_title="Ask Your Doubt🤗"
          online_message="We are here to help!"
          flow_id={flow}
          host_url="http://127.0.0.1:7860"
          start_open={true}
          tweaks={TWEAKS}
        />
      </div>

      <div className="flex flex-col justify-center items-center rounded-xl bg-neutral-900 h-[95dvh]  z-20 opacity-80">
        <div className="fixed top-10">
          {selectedTab?.title === "YTVideoSummarizer" && (
            <div className="flex items-center justify-center font-minecraft text-white gap-4 font-semibold text-xl">
              <Image src={"/yt.svg"} alt="yt-logo" width={80} height={80} />
              <p>Summarize YT lectures!</p>
            </div>
          )}
          {selectedTab?.title === "DigiNotes" && (
            <div className="flex items-center justify-center font-minecraft text-white gap-4 font-semibold text-xl">
              <Image src={"/notes.svg"} alt="yt-logo" width={80} height={80} />
              <p>Convert Digital Notes!</p>
            </div>
          )}
          {selectedTab?.title === "ResearchAssist" && (
            <div className="flex items-center justify-center font-minecraft text-white gap-4 font-semibold text-xl">
              <Image
                src={"/research.svg"}
                alt="yt-logo"
                width={80}
                height={80}
              />
              <p>Research Assistant!</p>
            </div>
          )}
          {selectedTab?.title === "Doubtnut" && (
            <div className="flex items-center justify-center font-minecraft text-white gap-4 font-semibold text-xl">
              <Image src={"/doubt.svg"} alt="yt-logo" width={80} height={80} />
              <p>Get Your Answers!</p>
            </div>
          )}
          {selectedTab?.title === "Q&A" && (
            <div className="flex items-center justify-center font-minecraft text-white gap-4 font-semibold text-xl">
              <Image src={"/doc.svg"} alt="yt-logo" width={80} height={80} />
              <p>Chat with your DOCs!</p>
            </div>
          )}
        </div>

        {selectedTab?.title === "DigiNotes" ? (
          <div className="flex flex-col w-[80%] text-white font-minecraft text-2xl font-bold">
            <p className="my-6">
              Choose the folder📁 containing handwritten notes!
            </p>
            {dir.map((ele) => {
              return (
                <Button
                  key={ele.id}
                  bg="darkgray"
                  shadow="white"
                  className={`w-full py-2 overflow-wrap text-sm ${
                    chosenDir == ele.id ? "font-bold bg-blue-400" : ""
                  }`}
                  onClick={() => {
                    updateFilePath(ele.path);
                    setChosenDir(ele.id);
                  }}
                >
                  {ele.path}
                </Button>
              );
            })}
          </div>
        ) : selectedTab?.title === "ResearchAssist" ? (
          <div className="text-white font-minecraft text-xl font-bold">
            Structure of Report:
            <Markdown
              className={
                "markdown-body prose flex flex-col word-break-break-word  "
              }
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeMathjax]}
            >
              {`
            ## EXECUTIVE SUMMARY: 
            [Key findings and implications] 
            
            ## METHODOLOGY: 
            -Search Strategy Used 
            - Sources Analyzed 
            - Quality Assessment
            
            ## FINDINGS & ANALYSIS: 
            [Detailed discussion of discoveries]
            
            ## CONCLUSIONS: 
            [Main takeaways and insights] 
            
            ## FUTURE DIRECTIONS:
            [Suggested next steps]`}
            </Markdown>
          </div>
        ) : selectedTab?.title === "YTVideoSummarizer" ? (
          <h1 className="text-2xl font-bold mb-4 text-white font-minecraft p-2">
            Put your video lecture link in the chatbox and Voila you just saved
            yourself a lot of time with summarized output!
          </h1>
        ) : (
          <FileUploader flow={flow} selectedTab={selectedTab?.title || ""} />
        )}
      </div>
    </div>
  );
}
