import React from 'react';

import { Conversation } from '@/types/chat';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  isEditing?: boolean;
  onStartEdit?: () => void;
  onRename?: (title: string) => void;
  onCancelEdit?: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
  isEditing,
  onStartEdit,
  onRename,
  onCancelEdit
}) => {
  return (
    <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'}`} onClick={onClick}>
      <div className="flex items-start space-x-3">
        <div className={`mt-1 w-6 h-6 rounded-md flex items-center justify-center ${isActive ? 'bg-blue-400' : 'bg-gray-200'}`}>
          <i className="fas fa-comment text-xs"></i>
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                defaultValue={conversation.title}
                onClick={e => e.stopPropagation()}
                onChange={e => onRename?.(e.target.value)}
                className="w-full text-sm px-2 py-1 rounded border border-gray-300 text-gray-800"
              />
              <div className="flex space-x-2 text-xs">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onCancelEdit?.();
                  }}
                  className="px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between space-x-2">
                <h3 className="font-medium truncate">{conversation.title}</h3>
                {onStartEdit && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onStartEdit();
                    }}
                    className="text-xs text-gray-400 hover:text-gray-200"
                  >
                    重命名
                  </button>
                )}
              </div>
              <p className={`text-sm truncate ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>{conversation.summary}</p>
              <p className="text-xs mt-1 text-gray-400">{conversation.time}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
