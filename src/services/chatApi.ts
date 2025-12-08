import { Conversation, Message } from '../types/chat';

const API_BASE = '/api';

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchConversations(): Promise<Conversation[]> {
  return fetchJson<Conversation[]>(`${API_BASE}/conversations`);
}

export function fetchMessages(conversationId: string): Promise<Message[]> {
  return fetchJson<Message[]>(`${API_BASE}/conversations/${conversationId}/messages`);
}

export function sendMessage(conversationId: string, content: string): Promise<Message> {
  return fetchJson<Message>(`${API_BASE}/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
}
