"use client";

import { useState } from "react";
import Navbar from "@/components/common/navbar";
import Chat from "@/components/chatComponent/chatComponent";

type MenuItem = "Dashboard" | "Insights" | "Transcript" | "Chat";

export default function ClientShell() {
  const [active, setActive] = useState<MenuItem>("Chat");

  return (
    <>
      <Navbar active={active} setActive={setActive} />
      <Chat activeMenu={active} />
    </>
  );
}
