"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUp,
  MoveLeft,
  PanelLeft,
  Paperclip,
  Phone,
  SquarePen,
  Video,
} from "lucide-react";
import { useState } from "react";
const chats = [
  {
    name: "Emma Chen",
    message: "How are patients selected for clinical tri...",
    active: false,
  },
  {
    name: "Dr. Emily Chen",
    message: "What roles do regulatory affairs speciali...",
    active: true,
  },
  {
    name: "Sarah Patel",
    message: "How do clinical research associates con...",
  },
  {
    name: "Rajiv Kumar",
    message: "What is the importance of pharmacovigil",
  },
  {
    name: "Linda Garcia",
    message: "How do medical science liaisons bridge",
  },
  {
    name: "Dr. Sarah Khan",
    message: "What are the latest advancements in dr",
  },
  {
    name: "Emily Thompson",
    message: "How do regulatory agencies impact phar",
  },
  {
    name: "David Li",
    message: "What role do clinical trials play in the ap",
  },
  {
    name: "Emily Chen",
    message: "What roles do regulatory affairs speciali...",
  },
];

const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[98%]  h-full z-10">
      <div className=" mt-6 h-[97%] 2xl:h-[97%] xl:h-[88%] flex gap-3    ">
        <div className="collapsible w-[8%] 2xl:w-[24%]  xl:w-[24%] h-full p-1">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="mt-2 flex xl:hidden  cursor-pointer items-center justify-center hover:opacity-75 "
          >
            <PanelLeft size={18} strokeWidth={1.5} />
          </div>
          <div className="mt-2 xl:flex hidden items-center justify-between px-2">
            <div className="text-xl font-semibold">Chats</div>
            <SquarePen
              size={18}
              strokeWidth={1.5}
              className="hover:opacity-75 cursor-pointer"
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
            {chats.map((chat, i) => (
              <div
                key={i}
                className={`flex gap-1 xl:gap-1 2xl:gap-3 items-center px-3 py-2 md:py-3  cursor-pointer mx-2 md:mx-0
                  ${chat.active ? "bg-[#EEF3FF] rounded-md border-b-0" : "hover:bg-[#F4F6FB]"} border-b border-[#EEEEEE]`}
              >
                <Avatar size="lg">
                  {" "}
                  <AvatarImage src="/doctor.png" alt="@shadcn" />
                  <AvatarFallback>
                    {chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col text-sm flex-wrap line-clamp-2">
                  <div className="font-medium">{chat.name}</div>
                  <div className="text-xs text-[#93A1B8]  max-w-[240px] ">
                    {chat.message}
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

        <div className="h-full bg-white px-2 py-3 xl:w-[80%] 2xl:w-[85%] w-[88%] rounded-2xl">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between border-b pb-3 border-b-[#EEEEEE]">
              <div className="flex gap-2  items-center ">
                <Avatar size="lg">
                  <AvatarImage src="/doctor.png" alt="@shadcn" />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 leading-3 text-sm">
                  <div className="font-medium">Dr. Emily Chen</div>
                  <div className="text-xs text-[#93A1B8]">
                    Medical Oncologist
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
            <div className="border border-[#EEEEEE] p-2 xl:p-4 rounded-xl shadow-lg/10">
              <div className="flex gap-2">
                <div className="rounded-full xl:px-2.5 xl:py-2 px-1.5 py-1.5 flex justify-center items-center  border border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer">
                  <Paperclip size={18} strokeWidth={1.5} />
                </div>
                <input
                  placeholder="Whats in your mind?"
                  className="pl-2 flex flex-1 focus:outline-0 text-sm md:text-base"
                ></input>
                <button className="rounded-full px-1.5 py-1.5 xl:p-2 flex justify-center items-center bg-linear-to-b from-5% to-90% from-[#013BDB] to-[#2C62F7]/90 cursor-pointer text-white border border-[#013BDB]/60 shadow-md inset-shadow-[#D2EAFF4D] shadow-[#01203C57] hover:opacity-95">
                  <ArrowUp size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
