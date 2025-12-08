import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchConversations, fetchMessages, sendMessage } from '../services/chatApi';
import { Conversation, Message } from '../types/chat';

interface UseConversationsOptions {
  enabled?: boolean;
  initialData?: Conversation[];
}

interface UseMessagesOptions {
  enabled?: boolean;
  initialData?: Message[];
}

export function useConversationsQuery(options?: UseConversationsOptions) {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: options?.enabled ?? false,
    initialData: options?.initialData
  });
}

export function useMessagesQuery(conversationId: string | null, options?: UseMessagesOptions) {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId as string),
    enabled: Boolean(options?.enabled && conversationId),
    initialData: options?.initialData
  });
}

export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) => sendMessage(conversationId, content),
    onSuccess: (_message, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
    }
  });
}
