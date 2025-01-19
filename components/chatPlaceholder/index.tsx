import { MoreHorizontal } from "lucide-react";
import { ChatMessagePlaceholderType } from "../types/chatWidget";
import { Bubble } from "pixel-retroui";

export default function ChatMessagePlaceholder({
  bot_message_style,
}: ChatMessagePlaceholderType) {
  return (
    <div
      className="cl-chat-message cl-justify-start"
    >
        <Bubble direction="left" className={"cl-bot_message"}>
            <div className="cl-animate-pulse">
              <MoreHorizontal />
            </div>
        </Bubble>
    </div>
  );
}
