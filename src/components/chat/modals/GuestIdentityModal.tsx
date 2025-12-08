import React, { useState, useEffect } from 'react';

interface GuestIdentityModalProps {
  isOpen: boolean;
  guestId: string;
  defaultNickname?: string;
  joinDate?: string;
  conversationCount?: number;
  onConfirm: (nickname: string) => void;
  onClose: () => void;
}

const GuestIdentityModal: React.FC<GuestIdentityModalProps> = ({
  isOpen,
  guestId,
  defaultNickname = '',
  joinDate,
  conversationCount,
  onConfirm,
  onClose
}) => {
  const [nickname, setNickname] = useState(defaultNickname);

  useEffect(() => {
    setNickname(defaultNickname);
  }, [defaultNickname]);

  if (!isOpen) return null;

  const primaryColor = '#0D355D';
  const secondaryColor = '#F3F4F6';

  const handleConfirm = () => {
    const finalName = nickname.trim() || `访客${(guestId || '').slice(-4)}`;
    onConfirm(finalName);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-6">
        {/* Top-right close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Avatar + Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: secondaryColor }}
          >
            <i className="fas fa-user text-3xl" style={{ color: primaryColor }}></i>
          </div>
          <h2 className="text-lg font-semibold mb-1">欢迎使用港股信息助手</h2>
          <p className="text-sm text-gray-500">您正在以访客身份使用本服务</p>
        </div>

        {/* Guest ID box */}
        <div className="rounded-xl p-4 mb-4 border border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600 mb-1">临时访客 ID</div>
          <div className="text-sm font-mono break-all text-gray-900">{guestId || '生成中...'}</div>
        </div>

        {/* Nickname input */}
        <div className="space-y-2 mb-6">
          <label className="block text-sm text-gray-800">
            设置昵称 <span className="text-xs text-gray-500">（可选）</span>
          </label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="例如：小明"
            maxLength={20}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
          >
            稍后设置
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-xl py-2 text-white transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            确认并继续
          </button>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-center mt-4 text-gray-500">
          继续使用即表示您同意仅将本服务用于信息查询目的
        </p>
      </div>
    </div>
  );
};

export default GuestIdentityModal;
