import ChatWidget from "@/components/chatWidget";
import { Dock } from "@/components/Dock";
import FeatureShowcase from "@/components/FeatureShowcase";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";
import { useTab } from "@/providers/tabs-provider";

export default function Home() {
  const handleFileSelect = (filePath: string) => {
    console.log("Selected file:", filePath);
    // Do something with the file path
  };

  return (
    <div className="flex flex-col px-96 gap-2 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-6xl text-white font-minecraft font-bold ">
            VIDYA
          </h1>
          <h2 className="text-2xl text-white font-minecraft underline underline-offset-4 ">
            Your AI-Powered Study Companion
          </h2>
        </div>
        <div className="text-white text-end text-sm z-50">
          <p className="me-4">Powered By</p>
          <Image
            src={"https://docs.langflow.org/img/langflow-logo-white.svg"}
            height={250}
            width={250}
            alt="langflow-logo"
          />
        </div>
      </div>
                <Image src={"/UH.png"} height={1000} width={1000} alt="UnitedHackV4-logo" className="mx-auto" />
      
      <FeatureShowcase />
    </div>
  );
}
