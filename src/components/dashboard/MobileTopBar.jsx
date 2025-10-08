import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import HamburgerIcon from "@/components/UI/HamburgerIcon";
import Sidebar from "./Sidebar";
function MobileTopBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-bold tracking-wide text-yellow-400">NexaExchange</span>
        {/*<HamburgerIcon open={sidebarOpen} onClick={() => setSidebarOpen((v) => !v)} />
        <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />*/}
        <Sidebar/>
      </div>
      
    </>
  );
}

export default MobileTopBar;
