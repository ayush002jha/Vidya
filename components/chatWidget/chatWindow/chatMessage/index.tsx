import Markdown from "react-markdown";
import { ChatMessageType } from "../../../types/chatWidget";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import { FileText } from "lucide-react";
import { convertMarkdownToPdf } from "../../utils";
import { Bubble } from 'pixel-retroui';

export default function ChatMessage({
  message,
  isSend,
  error,
  user_message_style,
  bot_message_style,
  error_message_style,
}: ChatMessageType) {
console.log(message)
  return (
    <div
      className={
        "cl-chat-message  " + (isSend ? " cl-justify-end" : " cl-justify-start")
      }
    >
      {isSend ? (
        <Bubble direction="right"
        bg="#7655ec"
        textColor="#ffffff"
        borderColor="#ffffff"
        className="cl-user_message ">
          {message}
        </Bubble>
      ) : error ? (
        <Bubble direction="left" bg="red" className={"cl-error_message bg-red-600"}>
          {message}
        </Bubble>
      ) : (
        <div className="flex flex-col overflow-hidden ">
        <Bubble direction="left"
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
        className={"cl-bot_message "}>
          <Markdown 
          className={"markdown-body prose flex flex-col word-break-break-word  "}
          remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeMathjax]}
          >
            {message}
          </Markdown>
        </Bubble>
          <button className=" flex text-base items-center text-violet-600 p-2 gap-1" onClick={()=>convertMarkdownToPdf(message)}>
            Save
            <FileText  className="text-violet-500"/>
          </button>
          </div>
      )}
    </div>
  );
}
