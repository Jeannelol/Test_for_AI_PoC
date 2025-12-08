import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatInterface } from "./components/ChatInterface";
import { GuestIdentityModal } from "./components/GuestIdentityModal";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestId, setGuestId] = useState("");
  const [guestNickname, setGuestNickname] = useState("");

  useEffect(() => {
    // Check if user is a first-time visitor
    const hasVisited = localStorage.getItem("hasVisited");
    const storedGuestId = localStorage.getItem("guestId");
    const storedNickname = localStorage.getItem("guestNickname");

    if (!hasVisited) {
      // Generate guest ID
      const newGuestId = `GUEST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setGuestId(newGuestId);
      setShowGuestModal(true);
    } else {
      if (storedGuestId) setGuestId(storedGuestId);
      if (storedNickname) setGuestNickname(storedNickname);
    }
  }, []);

  const handleGuestConfirm = (nickname: string) => {
    setGuestNickname(nickname);
    localStorage.setItem("hasVisited", "true");
    localStorage.setItem("guestId", guestId);
    localStorage.setItem("guestNickname", nickname);
    localStorage.setItem("joinDate", new Date().toLocaleDateString("zh-CN"));
    setShowGuestModal(false);
  };

  const handleGuestClose = () => {
    const defaultNickname = `访客${guestId.slice(-4)}`;
    setGuestNickname(defaultNickname);
    localStorage.setItem("hasVisited", "true");
    localStorage.setItem("guestId", guestId);
    localStorage.setItem("guestNickname", defaultNickname);
    localStorage.setItem("joinDate", new Date().toLocaleDateString("zh-CN"));
    setShowGuestModal(false);
  };

  const handleUpdateNickname = (newNickname: string) => {
    setGuestNickname(newNickname);
    localStorage.setItem("guestNickname", newNickname);
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    console.log(`Renaming conversation ${id} to ${newTitle}`);
    // In a real app, this would update the conversation in the backend
  };

  return (
    <>
      <div className="flex h-screen bg-[#F7F9FB] overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentConversationId={currentConversationId}
          onSelectConversation={setCurrentConversationId}
          onNewChat={() => setCurrentConversationId(null)}
          loadingState="idle"
          onRenameConversation={handleRenameConversation}
        />
        <ChatInterface
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          conversationId={currentConversationId}
          guestId={guestId}
          guestNickname={guestNickname}
          onUpdateNickname={handleUpdateNickname}
        />
      </div>
      <GuestIdentityModal
        isOpen={showGuestModal}
        onClose={handleGuestClose}
        onConfirm={handleGuestConfirm}
        guestId={guestId}
      />
    </>
  );
}