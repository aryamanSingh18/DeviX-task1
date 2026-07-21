import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-ink-950 text-mist-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ChatRoom />
      </div>
    </div>
  );
}
