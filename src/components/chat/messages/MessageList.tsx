import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/chat';

import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
