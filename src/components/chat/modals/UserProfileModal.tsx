import React, { useEffect, useState } from 'react';

interface UserProfileModalProps {
  isOpen: boolean;
  guestId: string;
  nickname: string;
  joinDate?: string;
  conversationCount?: number;
  onClose: () => void;
  onSave: (nickname: string) => void;
  onClearData: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  guestId,
  nickname,
  joinDate,
  conversationCount,
  onClose,
  onSave,
  onClearData
}) => {
  const [value, setValue] = useState(nickname);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(nickname);
  }, [nickname]);

  if (!isOpen) return null;

  const primaryColor = '#0D355D';
  const primaryColorLight = '#E8EFF7';

  const handleSave = () => {
    const finalName = value.trim();
    if (!finalName) return;
    onSave(finalName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setValue(nickname);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white text-gray-900 flex flex-col items-center justify-center py-7 relative border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: primaryColorLight }}
          >
            <i className="fas fa-user text-3xl" style={{ color: primaryColor }}></i>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                maxLength={20}
                className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base"
                placeholder="输入昵称"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-700"
                title="保存昵称"
              >
                <i className="fas fa-check" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
                title="取消"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-2xl font-bold">{value || '访客用户'}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-600 hover:text-gray-800"
                title="编辑昵称"
              >
                <i className="fas fa-pen"></i>
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500">访客用户</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* 访客 ID */}
          <div className="rounded-xl p-4 border border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-600 mb-1">访客 ID</div>
            <div className="text-sm font-mono break-all text-gray-900">
              {guestId || '未生成'}
            </div>
          </div>

          {/* 加入时间 & 对话数量 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl p-4 border border-gray-200 bg-white">
              <div className="text-xs text-gray-500 mb-1">加入时间</div>
              <div className="text-sm text-gray-900">{joinDate || '-'}</div>
            </div>
            <div className="rounded-xl p-4 border border-gray-200 bg-white">
              <div className="text-xs text-gray-500 mb-1">对话数量</div>
              <div className="text-sm text-gray-900">
                {typeof conversationCount === 'number' ? `${conversationCount} 个` : '-'}
              </div>
            </div>
          </div>

          {/* 隐私说明 */}
          <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
            <div className="text-xs text-gray-800 mb-1 flex items-center gap-2">
              <i className="fas fa-lock" style={{ color: primaryColor }}></i>
              <span>隐私保护</span>
            </div>
            <ul className="mt-1 space-y-1 text-xs text-gray-600 list-disc list-inside">
              <li>所有数据仅存储在本地浏览器</li>
              <li>我们不收集任何个人身份信息</li>
              <li>清除浏览器数据将删除所有记录</li>
            </ul>
          </div>

          {/* 底部按钮 */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClearData}
              className="flex-1 rounded-xl py-3 border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors font-semibold"
            >
              清除所有数据
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl py-3 border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors font-semibold"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
