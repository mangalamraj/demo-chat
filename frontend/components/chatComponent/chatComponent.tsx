"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat, Doctor } from "@/types";
import {
  ArrowUp,
  Copy,
  PanelLeft,
  Paperclip,
  Phone,
  RefreshCw,
  SquarePen,
  ThumbsDown,
  ThumbsUp,
  Video,
  Volume2,
  WandSparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ChatComponentProps {
  activeMenu: string;
}

const ChatComponent = ({ activeMenu }: ChatComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/doctors`,
      );
      const data = await res.json();
      setDoctors(data);
      setSelectedDoctor(data[0]);
      setChatMessages(data[0].chats ? data[0].chats : []);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!input || !selectedDoctor) return;
    const userMessage: Chat = { role: "user", content: input };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/stream`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          message: input,
        }),
      },
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let assistantMessage = "";

    setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const token = line.replace("data: ", "");
          assistantMessage += token;

          setChatMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantMessage,
            };
            return updated;
          });
        }
      }
    }
  };

  return (
    <div className="w-[98%] h-[95%] md:h-[98%]  2xl:h-[92%] z-10">
      {activeMenu === "Chat" && (
        <div className=" mt-6 h-[97%] 2xl:h-[97%] xl:h-[88%] flex md:gap-3    ">
          <div className=" w-[8%] 2xl:w-[24%]  xl:w-[24%] h-full p-1">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="mt-4 flex xl:hidden  cursor-pointer items-center justify-center hover:opacity-75 "
            >
              <PanelLeft size={18} strokeWidth={1.5} />
            </div>
            <div className="mt-2 xl:flex hidden items-center justify-between px-2">
              <div className="text-xl font-semibold">Chats</div>
              <SquarePen
                size={18}
                strokeWidth={1.5}
                className="hover:opacity-65 cursor-pointer"
              />
            </div>

            <div
              className={`
              mt-4 flex flex-col gap-1 xl:gap-1 2xl:gap-2
              bg-white xl:bg-transparent h-[90%] z-50 shadow-xl rounded-xl
              transition-all duration-300 ease-out overflow-y-scroll

              ${
                isOpen
                  ? "absolute left-0 border  top-12 w-[75%] opacity-100 translate-x-0 rounded-r-xl rounded-l-none pt-2"
                  : "absolute left-0 top-14 w-[90%] opacity-0 -translate-x-4 pointer-events-none"
              }

              xl:static xl:w-full xl:opacity-100 xl:translate-x-0 xl:shadow-none xl:pointer-events-auto
            `}
            >
              {" "}
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setChatMessages(doctor?.chats || []);
                  }}
                  className={`flex gap-1 xl:gap-1 2xl:gap-3 items-center px-3 py-2 md:py-3  cursor-pointer mx-2 md:mx-0 border-b border-[#EEEEEE]
                  ${
                    selectedDoctor?.id === doctor.id
                      ? "bg-[#EEF3FF] rounded-md border-b-0"
                      : "hover:bg-[#F4F6FB]"
                  }
                `}
                >
                  <Avatar size="lg">
                    <AvatarImage src="/doctor.png" />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-xs text-[#93A1B8]">
                      {doctor.specialization}
                    </div>
                  </div>
                </div>
              ))}
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="m-2 flex xl:hidden  cursor-pointer items-end justify-end mt-auto"
              >
                <PanelLeft size={18} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="h-full bg-white px-2 py-3 xl:w-[80%] 2xl:w-[85%] w-[92%] rounded-2xl">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between border-b pb-3 border-b-[#EEEEEE]">
                <div className="flex gap-2  items-center ">
                  <Avatar size="lg">
                    <AvatarImage src="/doctor.png" alt="@shadcn" />

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 leading-3 text-sm">
                    <div className="font-medium">{selectedDoctor?.name}</div>
                    <div className="text-xs text-[#93A1B8]">
                      {selectedDoctor?.specialization}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="rounded-full py-2 px-2.5 flex justify-center items-center  border border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer">
                    <Video size={18} strokeWidth={1.5} />
                  </div>
                  <div className="rounded-full py-2 px-2.5 flex justify-center items-center  border border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer">
                    <Phone size={16} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 overflow-y-auto px-2 py-4 space-y-3 [overflow-anchor:none]">
                {chatMessages.map((chat, idx) => (
                  <div key={idx} className="w-full">
                    <div
                      className={`prose prose-sm  max-w-[80%] px-3 py-3 text-sm
                      ${
                        chat.role === "user"
                          ? "ml-auto bg-[#4B7BFF]/98 text-white w-fit rounded-b-xl rounded-l-xl rounded-tr-none"
                          : "mr-auto bg-[#F4F6FB] w-fit rounded-b-xl rounded-r-xl rounded-tl-none"
                      }
                    `}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {chat.content}
                      </ReactMarkdown>
                    </div>

                    {chat.role !== "user" && (
                      <div className="flex gap-2 p-2">
                        <Copy
                          size={12}
                          className="rotate-90 hover:opacity-65 cursor-pointer"
                        />
                        <Volume2
                          size={12}
                          className="hover:opacity-65 cursor-pointer"
                        />
                        <ThumbsUp
                          size={12}
                          className="hover:opacity-65 cursor-pointer"
                        />
                        <ThumbsDown
                          size={12}
                          className="hover:opacity-65 cursor-pointer"
                        />
                        <WandSparkles
                          size={12}
                          className="hover:opacity-65 cursor-pointer"
                        />
                        <RefreshCw
                          size={12}
                          className="hover:opacity-65 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="border border-[#EEEEEE] p-2 xl:p-4 rounded-xl shadow-lg/10 ">
                <div className="flex gap-2">
                  <div className="rounded-full xl:px-2.5 xl:py-2 px-1.5 py-1.5 flex justify-center items-center  border border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer">
                    <Paperclip size={18} strokeWidth={1.5} />
                  </div>
                  <input
                    placeholder="Ask Anything"
                    value={input}
                    className="pl-2 flex flex-1 focus:outline-0 text-sm md:text-base"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  ></input>
                  <button
                    onClick={sendMessage}
                    className="
                      relative
                      rounded-full
                      px-1.5 py-1.5 xl:p-2
                      flex justify-center items-center
                      cursor-pointer text-white

                      bg-linear-to-b from-5% to-90%
                      from-[#013BDB] to-[#2C62F7]/90

                      border border-[#013BDB]/60
                      shadow-md inset-shadow-[#D2EAFF4D] shadow-[#01203C57]
                      hover:opacity-95

                      before:absolute before:inset-0
                      before:rounded-full
                      before:pointer-events-none
                      before:bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0.5px,transparent_0.6px)]
                      before:bg-[size:7px_7px]
                    "
                  >
                    <ArrowUp size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeMenu === "Insights" && (
        <div className="text-center  h-full flex justify-center align-middle items-center">
          Insights
        </div>
      )}
      {activeMenu === "Transcript" && (
        <div className="text-center  h-full flex justify-center align-middle items-center">
          Transcript
        </div>
      )}
      {activeMenu === "Dashboard" && (
        <div className="text-center  h-full flex justify-center align-middle items-center">
          Dashboard
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
