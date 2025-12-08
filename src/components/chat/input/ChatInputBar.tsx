import React from 'react';

import { Button } from '@/components/ui/button';

interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({ value, onChange, onSend, onKeyPress, inputRef, disabled }) => {
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative flex items-center">
            <textarea
              ref={inputRef}
              value={value}
              onChange={event => onChange(event.target.value)}
              onKeyDown={onKeyPress}
              placeholder="询问港股行情、个股分析、市场动态…"
              className="w-full border border-gray-300 rounded-2xl py-3 px-4 pr-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 max-h-32"
              rows={1}
            />

            <div className="absolute right-2 inset-y-0 flex items-center space-x-2">
              <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                <i className="fas fa-microphone text-sm"></i>
              </button>
              <Button
                onClick={onSend}
                disabled={!value.trim() || disabled}
                className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center rounded-button whitespace-nowrap"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            本助手提供的市场信息、个股分析及数据引用均来自公开资料，仅供参考，不构成任何投资建议或买卖依据。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBar;
