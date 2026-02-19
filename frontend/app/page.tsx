import ChatComponent from "@/components/chatComponent/chatComponent";
import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <div className="relative h-screen  w-screen overflow-hidden  text-black">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#ffffff,#e9d0ff)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_109%_14%,#33B8FF66,transparent_40%)]" />

      <div className="relative z-10 flex h-full flex-col items-center py-3 px-2 md:px-8 bg-[#F9FAFF]/60">
        <Navbar />
        <ChatComponent />
      </div>
    </div>
  );
}
