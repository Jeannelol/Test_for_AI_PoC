// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ChatInputBar from '@/components/chat/input/ChatInputBar';
import GuestIdentityModal from '@/components/chat/modals/GuestIdentityModal';
import HeaderBar from '@/components/chat/layout/HeaderBar';
import MessageList from '@/components/chat/messages/MessageList';
import Sidebar from '@/components/chat/sidebar/Sidebar';
import WelcomeSection from '@/components/chat/layout/WelcomeSection';
import UserProfileModal from '@/components/chat/modals/UserProfileModal';
import { useChatMessages } from '@/features/chat/hooks/useChatMessages';
import { useConversationsQuery } from '@/hooks/useChatApi';
import { Conversation, DEFAULT_CONVERSATIONS, DEFAULT_GREETING } from '@/types/chat';
import { generateGuestId } from '@/utils/guest';

const queryClient = new QueryClient();
const USE_API = import.meta.env.VITE_USE_API === 'false' ? false : true; // 默认开启，命令行设置 VITE_USE_API=false 可禁用

const ChatApp: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scenarioKey, setScenarioKey] = useState<string | undefined>(undefined);
  const [isSending, setIsSending] = useState(false);
  const [guestId, setGuestId] = useState<string>('');
  const [guestNickname, setGuestNickname] = useState<string>('');
  const [joinDate, setJoinDate] = useState<string>('');
  const [showGuestModal, setShowGuestModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [complianceMessage, setComplianceMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { data: remoteConversations = DEFAULT_CONVERSATIONS, isLoading: conversationsLoading, isError: conversationsError } = useConversationsQuery({
    enabled: USE_API,
    initialData: DEFAULT_CONVERSATIONS
  });

  const {
    currentConversationId,
    setCurrentConversationId,
    messages,
    isLoading: messagesLoading,
    refetchMessages,
    sendMessage: sendChatMessage,
    isSending: isSendingChat,
    resetMessages
  } = useChatMessages({ useApi: USE_API, initialMessages: [DEFAULT_GREETING] });

  const effectiveConversations = USE_API ? remoteConversations : conversations;

  const sortedConversations = useMemo(() => {
    return [...effectiveConversations].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [effectiveConversations]);

  useEffect(() => {
    const storedHasVisited = localStorage.getItem('hasVisited');
    const storedGuestId = localStorage.getItem('guestId');
    const storedNickname = localStorage.getItem('guestNickname');
    const storedJoinDate = localStorage.getItem('joinDate');

    if (!storedHasVisited || !storedGuestId) {
      const newId = generateGuestId();
      const today = new Date().toLocaleDateString('zh-CN');

      setGuestId(newId);
      setGuestNickname('');
      setJoinDate(today);
      setShowGuestModal(true);
    } else {
      setGuestId(storedGuestId);
      setGuestNickname(storedNickname || `访客${storedGuestId.slice(-4)}`);
      if (storedJoinDate) {
        setJoinDate(storedJoinDate);
      }
    }
  }, []);

  useEffect(() => {
    const handleSelectConversation = (event: Event) => {
      const { detail } = event as CustomEvent<string | null>;

      if (detail === null) {
        setActiveConversation(null);
        setCurrentConversationId(null);
        resetMessages([DEFAULT_GREETING]);
      } else if (typeof detail === 'string' && detail.startsWith('conv_')) {
        setActiveConversation(detail);
        setCurrentConversationId(detail);
        resetMessages([DEFAULT_GREETING]);
      } else {
        setActiveConversation(detail);
        setCurrentConversationId(detail);
      }
    };

    window.addEventListener('selectConversation', handleSelectConversation as EventListener);
    return () => window.removeEventListener('selectConversation', handleSelectConversation as EventListener);
  }, []);

  const handleGuestConfirm = (nickname: string) => {
    const finalName = nickname.trim() || `访客${guestId.slice(-4)}`;
    const today = joinDate || new Date().toLocaleDateString('zh-CN');

    setGuestNickname(finalName);
    setJoinDate(today);

    localStorage.setItem('guestId', guestId);
    localStorage.setItem('guestNickname', finalName);
    localStorage.setItem('joinDate', today);
    localStorage.setItem('hasVisited', 'true');

    setShowGuestModal(false);
  };

  const handleGuestSkip = () => {
    const fallbackName = `访客${guestId.slice(-4)}`;
    const today = joinDate || new Date().toLocaleDateString('zh-CN');

    setGuestNickname(fallbackName);
    setJoinDate(today);

    localStorage.setItem('guestId', guestId);
    localStorage.setItem('guestNickname', fallbackName);
    localStorage.setItem('joinDate', today);
    localStorage.setItem('hasVisited', 'true');

    setShowGuestModal(false);
  };

  const handleProfileSave = (nickname: string) => {
    const finalName = nickname.trim();
    if (!finalName) return;
    setGuestNickname(finalName);
    localStorage.setItem('guestNickname', finalName);
  };

  const handleProfileClear = () => {
    localStorage.removeItem('hasVisited');
    localStorage.removeItem('guestId');
    localStorage.removeItem('guestNickname');
    localStorage.removeItem('joinDate');

    const newId = generateGuestId();
    const today = new Date().toLocaleDateString('zh-CN');

    setGuestId(newId);
    setGuestNickname('');
    setJoinDate(today);

    setShowProfileModal(false);
    setShowGuestModal(true);
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleConversationSelect = (id: string) => {
    setActiveConversation(id);
    setCurrentConversationId(id);
  };

  const handleNewConversation = () => {
    setActiveConversation(null);
    setCurrentConversationId(null);
    resetMessages([DEFAULT_GREETING]);
  };

  const handleRenameConversation = (id: string, title: string) => {
    if (USE_API) return; // 占位：接入后端时改为 mutation
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, title: title || c.title } : c)).map(c =>
        c.id === id ? { ...c, updatedAt: Date.now(), time: new Date().toLocaleString('zh-CN') } : c
      )
    );
  };

  const handleScenarioSelect = (example: string, key?: string) => {
    setNewMessage(example);
    setScenarioKey(key);
    inputRef.current?.focus();
  };

  const updateConversationTimestamp = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === conversationId ? { ...c, updatedAt: Date.now(), time: new Date().toLocaleString('zh-CN') } : c))
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // 简单合规示例：包含“违法”则阻止发送并提示
    if (newMessage.includes('违法')) {
      setComplianceMessage('内容疑似违规，请调整后再试。');
      return;
    }
    setComplianceMessage(null);

    const content = newMessage;
    setNewMessage('');
    setIsSending(true);

    sendChatMessage(content, { conversationId: activeConversation, scenarioKey });

    if (USE_API && activeConversation) {
      refetchMessages?.();
      updateConversationTimestamp(activeConversation);
    }

    setIsSending(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        conversations={sortedConversations}
        activeConversation={activeConversation}
        onSelectConversation={handleConversationSelect}
        onNewConversation={handleNewConversation}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        editingId={editingId}
        onStartEdit={id => setEditingId(id)}
        onCancelEdit={() => setEditingId(null)}
        onRename={(id, title) => {
          handleRenameConversation(id, title);
          setEditingId(null);
        }}
        loadingState={
          USE_API
            ? conversationsLoading
              ? 'loading'
              : conversationsError
              ? 'error'
              : 'idle'
            : 'idle'
        }
      />

      <div className="flex-1 flex flex-col">
        <HeaderBar onProfileClick={() => setShowProfileModal(true)} />

        <main className="flex-1 overflow-hidden flex flex-col">
          {complianceMessage && <div className="bg-yellow-50 text-yellow-800 text-sm px-4 py-2 border-b border-yellow-200">{complianceMessage}</div>}
          {activeConversation ? (
            <>
              {USE_API && messagesLoading && <div className="p-4 text-sm text-gray-500">加载消息中…</div>}
              {USE_API && <MessageList messages={messages} />}
              {!USE_API && <MessageList messages={messages} />}
            </>
          ) : (
            <WelcomeSection onSelectScenario={handleScenarioSelect} />
          )}
        </main>

        <ChatInputBar
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          inputRef={inputRef}
          disabled={isSending || isSendingChat}
        />
      </div>

      <GuestIdentityModal
        isOpen={showGuestModal}
        guestId={guestId}
        defaultNickname={guestNickname}
        joinDate={joinDate || undefined}
        conversationCount={effectiveConversations.length}
        onConfirm={handleGuestConfirm}
        onClose={handleGuestSkip}
      />
      <UserProfileModal
        isOpen={showProfileModal}
        guestId={guestId}
        nickname={guestNickname}
        joinDate={joinDate || undefined}
        conversationCount={effectiveConversations.length}
        onClose={() => setShowProfileModal(false)}
        onSave={handleProfileSave}
        onClearData={handleProfileClear}
      />
    </div>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ChatApp />
  </QueryClientProvider>
);

export default App;
