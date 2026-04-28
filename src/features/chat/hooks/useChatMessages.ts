import { useEffect, useState } from 'react';

import { useMessagesQuery, useSendMessageMutation } from '@/hooks/useChatApi';
import { DEFAULT_GREETING, Message } from '@/types/chat';

interface UseChatMessagesOptions {
  useApi?: boolean;
  initialMessages?: Message[];
}

interface SendOptions {
  conversationId?: string | null;
  scenarioKey?: string;
}

/**
 * 聚合聊天相关逻辑的占位 Hook。
 * 目前支持 API 与本地 mock 两种路径，后续可扩展会话管理、状态聚合等。
 */
export function useChatMessages(options?: UseChatMessagesOptions) {
  const useApi = options?.useApi ?? false;
  const initialMessages = options?.initialMessages ?? [DEFAULT_GREETING];

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>(initialMessages);
  const [isSendingLocal, setIsSendingLocal] = useState(false);

  useEffect(() => {
    setLocalMessages(initialMessages);
  }, [initialMessages]);

  const messagesQuery = useMessagesQuery(currentConversationId, {
    enabled: Boolean(useApi && currentConversationId),
    initialData: initialMessages
  });

  const sendMessageMutation = useSendMessageMutation();

  const sendMessage = (content: string, opts?: SendOptions) => {
    const conversationId = opts?.conversationId ?? currentConversationId;
    const scenarioKey = opts?.scenarioKey;

    if (useApi && conversationId) {
      return sendMessageMutation.mutate({ conversationId, content });
    }

    // 本地 mock 发送
    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      time: timestamp,
      status: 'pending',
      scenarioKey
    };

    setIsSendingLocal(true);
    setLocalMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '感谢您的提问，我已经收到您的问题。正在为您分析相关信息...',
        sender: 'assistant',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        scenarioKey
      };

      setLocalMessages(prev =>
        prev.map(m => (m.id === userMessage.id ? { ...m, status: 'sent' as const } : m)).concat(assistantMessage)
      );
      setIsSendingLocal(false);
    }, 800);
  };

  const resetMessages = (messages: Message[] = initialMessages) => {
    setLocalMessages(messages);
  };

  return {
    currentConversationId,
    setCurrentConversationId,
    messages: useApi ? messagesQuery.data ?? initialMessages : localMessages,
    isLoading: useApi ? messagesQuery.isLoading : false,
    refetchMessages: messagesQuery.refetch,
    sendMessage,
    isSending: useApi ? sendMessageMutation.isPending : isSendingLocal,
    resetMessages
  };
}
