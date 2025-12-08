import { useState } from "react";
import { Search, Plus, MessageSquare, ChevronLeft, ChevronRight, Edit2, Loader2, AlertCircle } from "lucide-react";
import { Logo } from "./Logo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  loadingState?: "idle" | "loading" | "error";
  onRenameConversation?: (id: string, newTitle: string) => void;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "港股昨日市况总结",
    timestamp: "1小时前",
    preview: "恒指、国指、科指涨跌幅与成交额概览"
  },
  {
    id: "2",
    title: "阿里巴巴未来 3–6 个月怎么看？",
    timestamp: "1小时前",
    preview: "基本面 + 盈利 + 估值 + 催化剂分析路径"
  },
  {
    id: "3",
    title: "港股上半年表现与海外指数对比",
    timestamp: "2小时前",
    preview: "恒指 vs S&P500 / Nasdaq / Nikkei225"
  },
  {
    id: "4",
    title: "主板上市要求",
    timestamp: "2小时前",
    preview: "主板上市的财务要求是什么？"
  },
  {
    id: "5",
    title: "IPO申请流程",
    timestamp: "昨天",
    preview: "香港IPO申请的流程是怎样的？"
  },
  {
    id: "6",
    title: "港交所交易机制",
    timestamp: "昨天",
    preview: "收市竞价是如何运作的？"
  },
  {
    id: "7",
    title: "红筹股公司",
    timestamp: "2天前",
    preview: "什么是红筹股公司？"
  },
  {
    id: "8",
    title: "创业板与主板对比",
    timestamp: "3天前",
    preview: "GEM和主板有什么区别？"
  },
  {
    id: "9",
    title: "市场熔断机制",
    timestamp: "4天前",
    preview: "香港的熔断机制如何运作？"
  },
  {
    id: "10",
    title: "H股上市",
    timestamp: "1周前",
    preview: "H股是什么，如何运作？"
  },
  {
    id: "11",
    title: "沽空规则",
    timestamp: "1周前",
    preview: "港交所的沽空规定是什么？"
  },
  {
    id: "12",
    title: "证监会披露要求",
    timestamp: "2周前",
    preview: "证监会规定的披露要求有哪些？"
  }
];

export function Sidebar({ isOpen, onToggle, currentConversationId, onSelectConversation, onNewChat, loadingState = "idle", onRenameConversation }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartRename = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleConfirmRename = (id: string) => {
    if (editTitle.trim() && onRenameConversation) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  if (!isOpen) {
    return (
      <>
        {/* Mobile Overlay */}
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40 hidden" />
        
        {/* Desktop Collapsed Sidebar */}
        <div className="relative w-16 bg-[#ECECEC] border-r border-[#D4D4D4] flex flex-col items-center py-4 hidden lg:flex">
          <div
            className="relative group mb-6"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <Logo size={40} variant="icon" />
            </div>
            
            {isHoveringLogo && (
              <>
                <button
                  onClick={onToggle}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#DADADA] rounded-full flex items-center justify-center hover:bg-[#D0D0D0] transition-colors shadow-lg z-10"
                >
                  <ChevronRight className="w-4 h-4 text-[#1E1E1E]" />
                </button>
                
                <div className="absolute left-full ml-2 top-0 bg-white text-[#333333] px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl z-50 border border-gray-200">
                  打开边栏
                </div>
              </>
            )}
          </div>

          <button
            onClick={onNewChat}
            className="w-10 h-10 bg-[#DADADA] rounded-lg flex items-center justify-center hover:bg-[#D0D0D0] transition-colors"
            title="新对话"
          >
            <Plus className="w-5 h-5 text-[#1E1E1E]" />
          </button>
        </div>
        
        {/* Mobile Floating Button */}
        <button
          onClick={onToggle}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all active:scale-95"
          title="打开菜单"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </>
    );
  }

  return (
    <>
      {/* Mobile Overlay - Click to close sidebar */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onToggle}
      />
      
      {/* Sidebar */}
      <div className="relative w-80 bg-[#ECECEC] border-r border-[#D4D4D4] flex flex-col lg:relative fixed left-0 top-0 bottom-0 z-50 shadow-2xl lg:shadow-none">
        <div className="p-4 border-b border-[#D4D4D4]">
          <div className="flex items-center justify-between mb-4">
            <Logo size={36} variant="full" />
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringCollapse(true)}
              onMouseLeave={() => setIsHoveringCollapse(false)}
            >
              <button
                onClick={onToggle}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#DADADA] transition-colors text-[#1E1E1E]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {isHoveringCollapse && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white text-[#333333] px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl z-50 border border-gray-200">
                  关闭边栏
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onNewChat}
            className="w-full bg-[#DADADA] hover:bg-[#D0D0D0] text-[#1E1E1E] px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>新对话</span>
          </button>
        </div>

        <div className="p-4 border-b border-[#D4D4D4]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E1E1E]" />
            <input
              type="text"
              placeholder="搜索对话记录..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#DADADA] text-[#1E1E1E] placeholder-[#1E1E1E]/50 pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-[#D0D0D0] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {loadingState === "loading" ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#1E1E1E]/60">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <span className="text-sm">加载对话记录中...</span>
              </div>
            ) : loadingState === "error" ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#E65100]">
                <AlertCircle className="w-8 h-8 mb-3" />
                <span className="text-sm mb-2">加载失败</span>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-[#0D3A66] underline hover:no-underline"
                >
                  重新加载
                </button>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center text-[#1E1E1E]/60 py-8">
                {searchQuery ? "未找到匹配的对话" : "暂无对话记录"}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group relative p-3 rounded-lg transition-colors cursor-pointer ${
                      currentConversationId === conv.id
                        ? "bg-[#D0D0D0] border border-[#D4D4D4]"
                        : "hover:bg-[#DADADA] border border-transparent"
                    }`}
                    onClick={() => onSelectConversation(conv.id)}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className={`w-4 h-4 mt-1 flex-shrink-0 ${
                        currentConversationId === conv.id ? "text-[#1E1E1E]" : "text-[#1E1E1E]/70"
                      }`} />
                      <div className="flex-1 min-w-0">
                        {editingId === conv.id ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={() => handleConfirmRename(conv.id)}
                            onKeyPress={(e) => e.key === "Enter" && handleConfirmRename(conv.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-white text-[#1E1E1E] px-2 py-1 rounded border border-[#D0D0D0] focus:border-[#0D3A66] focus:outline-none text-sm mb-1"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center justify-between mb-1">
                            <div className={`text-sm truncate flex-1 ${
                              currentConversationId === conv.id ? "text-[#1E1E1E]" : "text-[#1E1E1E]"
                            }`}>
                              {conv.title}
                            </div>
                            {onRenameConversation && (
                              <button
                                onClick={(e) => handleStartRename(conv, e)}
                                className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-[#DADADA] rounded transition-all flex-shrink-0"
                                title="重命名"
                              >
                                <Edit2 className="w-3 h-3 text-[#1E1E1E]/70" />
                              </button>
                            )}
                          </div>
                        )}
                        <div className="text-xs text-[#1E1E1E]/60 truncate">
                          {conv.preview}
                        </div>
                        <div className="text-xs text-[#1E1E1E]/50 mt-1">
                          {conv.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#D4D4D4] text-xs text-[#1E1E1E]/60">
          仅供参考 - 不构成投资建议
        </div>
      </div>
    </>
  );
}