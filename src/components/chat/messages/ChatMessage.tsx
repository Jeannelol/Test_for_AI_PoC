import React from 'react';

import { Message } from '@/types/chat';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  const statusText =
    message.status === 'pending'
      ? '发送中…'
      : message.status === 'failed'
      ? '发送失败'
      : undefined;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {!isUser && (
          <div className="mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-robot text-white text-sm"></i>
          </div>
        )}

        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
          {statusText && <div className="mt-1 text-xs opacity-80">{statusText}</div>}
        </div>

        {isUser && (
          <div className="mt-1 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-user text-gray-600 text-sm"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
