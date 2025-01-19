import { Send } from "lucide-react";
import {
  extractMessageFromOutput,
  getAnimationOrigin,
  getChatPosition,
} from "../utils";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../types/chatWidget";
import ChatMessage from "./chatMessage";
import { sendMessage } from "../../controllers";
import ChatMessagePlaceholder from "../../chatPlaceholder";
import { convertMarkdownToPdf } from "../utils";
import { Boxes } from "@/components/ui/background-boxes";
import FilePicker from "@/components/file-picker";
import { useTab } from "@/providers/tabs-provider";
import FileUploader from "@/components/FileUpload";
import { Button } from "pixel-retroui";

export default function ChatWindow({
  api_key,
  flowId,
  hostUrl,
  updateLastMessage,
  messages,
  output_type,
  input_type,
  output_component,
  bot_message_style,
  send_icon_style,
  user_message_style,
  chat_window_style,
  error_message_style,
  placeholder_sending,
  send_button_style,
  online = true,
  open,
  online_message = "We'll reply as soon as we can",
  offline_message = "We're offline now",
  window_title = "Chat",
  placeholder,
  input_style,
  input_container_style,
  addMessage,
  position,
  triggerRef,
  tweaks,
  sessionId,
  additional_headers,
}: {
  api_key?: string;
  output_type: string;
  input_type: string;
  output_component?: string;
  bot_message_style?: React.CSSProperties;
  send_icon_style?: React.CSSProperties;
  user_message_style?: React.CSSProperties;
  chat_window_style?: React.CSSProperties;
  error_message_style?: React.CSSProperties;
  send_button_style?: React.CSSProperties;
  online?: boolean;
  open: boolean;
  online_message?: string;
  placeholder_sending?: string;
  offline_message?: string;
  window_title?: string;
  placeholder?: string;
  input_style?: React.CSSProperties;
  input_container_style?: React.CSSProperties;
  tweaks?: { [key: string]: any };
  flowId: string;
  hostUrl: string;
  updateLastMessage: Function;
  messages: ChatMessageType[];
  addMessage: Function;
  position?: string;
  triggerRef: React.RefObject<HTMLButtonElement>;

  sessionId: React.MutableRefObject<string>;
  additional_headers?: { [key: string]: string };
}) {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const lastMessage = useRef<HTMLDivElement>(null);
  const [windowPosition, setWindowPosition] = useState({ left: "0", top: "0" });
  const inputRef = useRef<HTMLInputElement>(null); /* User input Ref */
  // useEffect(() => {
  //   if (triggerRef)
  //     setWindowPosition(
  //       getChatPosition(
  //         triggerRef.current!.getBoundingClientRect(),
  //         width,
  //         height,
  //         position
  //       )
  //     );
  // }, [triggerRef, width, height, position]);

  /* Initial listener for loss of focus that refocuses User input after a small delay */

  const [sendingMessage, setSendingMessage] = useState(false);

  function handleClick() {
    if (value && value.trim() !== "") {
      addMessage({ message: value, isSend: true });
      setSendingMessage(true);
      setValue("");
      sendMessage(
        hostUrl,
        flowId,
        value,
        input_type,
        output_type,
        sessionId,
        output_component,
        tweaks,
        api_key,
        additional_headers
      )
        .then((res) => {
          if (
            res.data &&
            res.data.outputs &&
            Object.keys(res.data.outputs).length > 0 &&
            res.data.outputs[0].outputs &&
            res.data.outputs[0].outputs.length > 0
          ) {
            const flowOutputs: Array<any> = res.data.outputs[0].outputs;
            if (
              output_component &&
              flowOutputs.map((e) => e.component_id).includes(output_component)
            ) {
              Object.values(
                flowOutputs.find((e) => e.component_id === output_component)
                  .outputs
              ).forEach((output: any) => {
                addMessage({
                  message: extractMessageFromOutput(output),
                  isSend: false,
                });
              });
            } else if (flowOutputs.length === 1) {
              Object.values(flowOutputs[0].outputs).forEach((output: any) => {
                addMessage({
                  message: extractMessageFromOutput(output),
                  isSend: false,
                });
              });
            } else {
              addMessage({
                message:
                  "Multiple outputs were detected in the response. Please, define the output_component to specify the intended response.",
                isSend: false,
                error: true,
              });
            }
          }
          if (res.data && res.data.session_id) {
            sessionId.current = res.data.session_id;
          }
          setSendingMessage(false);
        })
        .catch((err) => {
          const response = err.response;
          if (err.code === "ERR_NETWORK") {
            updateLastMessage({
              message: "Network error",
              isSend: false,
              error: true,
            });
          } else if (
            response &&
            response.status === 500 &&
            response.data &&
            response.data.detail
          ) {
            updateLastMessage({
              message: response.data.detail,
              isSend: false,
              error: true,
            });
          }
          console.error(err);
          setSendingMessage(false);
        });
    }
  }

  useEffect(() => {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Refocus the User input whenever a new response is returned from the LLM */

  useEffect(() => {
    // after a slight delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [messages, open]);

  const { selectedTab, filePath } = useTab();
  placeholder =
    selectedTab === "YTVideoSummarizer"
      ? "Paste the ▶️Youtube Lecture Link Here🔗"
      : placeholder;
  return (
    <div
      className={
        "" +
        getAnimationOrigin(position) +
        (open ? " cl-scale-100" : " cl-scale-0")
      }
      style={{}}
    >
      {/* <Boxes  /> */}

      <div
        style={{ ...chat_window_style }}
        ref={ref}
        className={`bg-transparent h-[80dvh]`}
      >
        <div className="cl-header bg-[#2c2054] text-white header-grain hidden">
          {window_title}
          <div className="cl-header-subtitle text-white">
            {online ? (
              <>
                <div className="cl-online-message"></div>
                {online_message}
              </>
            ) : (
              <>
                <div className="cl-offline-message"></div>
                {offline_message}
              </>
            )}
          </div>
        </div>
        <div className="cl-messages_container bg-gray-100 bg-transparent">
          {messages.map((message, index) => (
            <ChatMessage
              bot_message_style={bot_message_style}
              user_message_style={user_message_style}
              error_message_style={error_message_style}
              key={index}
              message={message.message}
              isSend={message.isSend}
              error={message.error}
            />
          ))}
          {sendingMessage && (
            <ChatMessagePlaceholder bot_message_style={bot_message_style} />
          )}
          <div ref={lastMessage}></div>
        </div>

        {selectedTab === "DigiNotes" ? (
          <Button
            bg="#fff"
            textColor="black"
            borderColor="blue"
            className="mx-auto"
            onClick={() => {
              setValue(filePath);
              handleClick();
            }}
          >
            Generate Digital Notes
          </Button>
        ) : (
          <div
            style={input_container_style}
            className="cl-input_container    bg-neutral-900 rounded-xl  mx-auto z-10"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
              }}
              type="text"
              disabled={sendingMessage}
              placeholder={
                sendingMessage
                  ? placeholder_sending || "Thinking..."
                  : placeholder || "Type your message..."
              }
              style={input_style}
              ref={inputRef}
              className="cl-input-element bg-neutral-900 rounded-xl text-gray-50 "
            />
            <button
              style={send_button_style}
              disabled={sendingMessage}
              onClick={handleClick}
            >
              <Send
                style={send_icon_style}
                color="#8058E0"
                className={
                  "cl-send-icon " +
                  (!sendingMessage
                    ? "cl-notsending-message"
                    : "cl-sending-message")
                }
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
