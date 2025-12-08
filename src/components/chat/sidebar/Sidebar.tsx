import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Conversation } from '@/types/chat';

import ConversationItem from './ConversationItem';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  editingId: string | null;
  onRename: (id: string, title: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  loadingState?: 'idle' | 'loading' | 'error';
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation,
  searchTerm,
  onSearchChange,
  editingId,
  onRename,
  onStartEdit,
  onCancelEdit,
  loadingState = 'idle'
}) => {
  const filtered = conversations.filter(c => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return true;
    return c.title.toLowerCase().includes(keyword) || c.summary.toLowerCase().includes(keyword);
  });

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'}`}>
      <div className="px-4 py-3 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 mx-auto">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-800">港股市场信息助手</h1>
          </div>
        )}

        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto rounded-button whitespace-nowrap w-10 h-10">
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-500`}></i>
        </Button>
      </div>

      <div className={`p-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <Button
          className={`rounded-button whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center ${
            isCollapsed ? 'w-10 h-10 p-0' : 'w-full'
          }`}
          onClick={onNewConversation}
        >
          <i className="fas fa-plus"></i>
          {!isCollapsed && <span className="ml-2">新建对话</span>}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <Input
              placeholder="搜索对话…"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 px-2">
        {!isCollapsed && (
          <div className="space-y-1 p-2">
            {loadingState === 'loading' && (
              <div className="p-3 text-sm text-gray-500">加载会话中…</div>
            )}
            {loadingState === 'error' && (
              <div className="p-3 text-sm text-red-500">会话加载失败，请稍后重试</div>
            )}
            {loadingState === 'idle' && filtered.length === 0 && (
              <div className="p-3 text-sm text-gray-500">暂无对话</div>
            )}
            {loadingState === 'idle' &&
              filtered.map(conversation => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversation === conversation.id}
                  isEditing={editingId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  onStartEdit={() => onStartEdit(conversation.id)}
                  onRename={title => onRename(conversation.id, title)}
                  onCancelEdit={onCancelEdit}
                />
              ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
