"use client";
import Image from "next/image";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { Book, LayoutGrid, MessageCircle, WandSparkles } from "lucide-react";

const MENU = ["Dashboard", "Insights", "Transcript", "Chat"] as const;
type MenuItem = (typeof MENU)[number];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState<MenuItem>("Chat");

  const baseItem =
    "flex gap-2 items-center justify-center py-1 px-3 rounded-full cursor-pointer   ";
  const activeItem =
    "bg-[linear-gradient(to_bottom,rgba(1,59,219,0.95),rgba(44,98,247,0.95)),url('/buttonbg.png')] text-white shadow-md/40 border border-[#2C62F7] px-8 py-2";
  const inactiveItem = " text-gray-500 hover:text-gray-700 ";

  return (
    <nav className="w-[98%]  z-90">
      <div className="w-full flex justify-between">
        <div className="flex w-full items-center">
          <div className="relative w-30 md:w-33 h-10">
            <Image src="/logo.svg" fill alt="logo" className="object-contain" />
          </div>

          <div className="hidden md:flex w-[85%] justify-center gap-8 font-base">
            <div className="p-2 px-4 border-2 border-white flex rounded-full gap-4 shadow-lg bg-[#F9FAFF]">
              <div
                onClick={() => setActive("Dashboard")}
                className={`${baseItem} ${
                  active === "Dashboard" ? activeItem : inactiveItem
                }`}
              >
                <LayoutGrid size={16} />
                Dashboard
              </div>

              <div
                onClick={() => setActive("Insights")}
                className={`${baseItem} ${
                  active === "Insights" ? activeItem : inactiveItem
                }`}
              >
                <WandSparkles size={16} />
                Insights
              </div>

              <div
                onClick={() => setActive("Transcript")}
                className={`${baseItem} ${
                  active === "Transcript" ? activeItem : inactiveItem
                }`}
              >
                <Book size={16} />
                Transcript
              </div>

              <div
                onClick={() => setActive("Chat")}
                className={`${baseItem} ${
                  active === "Chat" ? activeItem : inactiveItem
                }`}
              >
                <MessageCircle size={16} />
                Chat
              </div>
            </div>
          </div>
        </div>

        <div className="relative md:hidden ">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            direction="left"
            size={20}
            color="#013BDB"
          />
        </div>
      </div>

      {isOpen && (
        <div className="">
          <div className="absolute  w-[94%]  mt-4 py-6 px-4 text-lg flex flex-col rounded-md gap-3 bg-blue-100/10 border backdrop-blur-lg shadow-2xl">
            {MENU.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setActive(item);
                  setOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 rounded-md ${
                  active === item
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200/40"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
