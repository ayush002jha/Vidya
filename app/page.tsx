import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-between">
        <div>
          <h1 className="text-6xl text-white font-minecraft font-bold ">
            VIDYA
          </h1>
          <h2 className="text-2xl text-white font-minecraft underline underline-offset-4 ">
            Your AI-Powered Study Companion
          </h2>
        </div>
        </div>
    </div>
  );
}
