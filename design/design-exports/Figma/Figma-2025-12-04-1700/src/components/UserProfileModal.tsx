import { useState } from "react";
import { X, User, Edit2, Check, Calendar, MessageSquare } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestId: string;
  guestNickname: string;
  onUpdateNickname: (newNickname: string) => void;
  conversationCount?: number;
}

export function UserProfileModal({
  isOpen,
  onClose,
  guestId,
  guestNickname,
  onUpdateNickname,
  conversationCount = 0,
}: UserProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(guestNickname);

  if (!isOpen) return null;

  const handleSave = () => {
    if (nickname.trim()) {
      onUpdateNickname(nickname.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNickname(guestNickname);
    setIsEditing(false);
  };

  const joinDate = localStorage.getItem("joinDate") || new Date().toLocaleDateString("zh-CN");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] rounded-t-2xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-4 border-white/30">
              <User className="w-10 h-10 text-white" />
            </div>
            
            {isEditing ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={20}
                  className="bg-white/20 backdrop-blur-sm text-white placeholder-white/60 px-3 py-2 rounded-lg border-2 border-white/30 focus:border-white focus:outline-none text-center"
                  placeholder="输入昵称"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                  title="保存"
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={handleCancel}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                  title="取消"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl text-white">{guestNickname}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                  title="编辑昵称"
                >
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
            
            <div className="text-white/80 text-sm">访客用户</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Guest ID */}
          <div className="bg-[#F7F9FB] rounded-xl p-4 border border-[#D5D9DE]">
            <div className="text-xs text-[#A3A8B1] mb-1">访客 ID</div>
            <div className="text-sm text-[#0A0F16] font-mono break-all">{guestId}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F7F9FB] rounded-xl p-4 border border-[#D5D9DE]">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#0D3A66]" />
                <div className="text-xs text-[#A3A8B1]">加入时间</div>
              </div>
              <div className="text-sm text-[#0A0F16]">{joinDate}</div>
            </div>

            <div className="bg-[#F7F9FB] rounded-xl p-4 border border-[#D5D9DE]">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#0D3A66]" />
                <div className="text-xs text-[#A3A8B1]">对话数量</div>
              </div>
              <div className="text-sm text-[#0A0F16]">{conversationCount} 个</div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-[#E3F2FD] border border-[#2196F3]/20 rounded-xl p-4">
            <div className="text-xs text-[#0D47A1] leading-relaxed">
              <strong>🔒 隐私保护</strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• 所有数据仅存储在本地浏览器</li>
                <li>• 我们不收集任何个人身份信息</li>
                <li>• 清除浏览器数据将删除所有记录</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                if (confirm("确定要清除所有本地数据吗？这将删除所有对话记录。")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-[#D5D9DE] text-[#E65100] hover:bg-[#FFF3E0] transition-colors"
            >
              清除所有数据
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-[#0D3A66] hover:bg-[#2A7FF0] text-white transition-colors shadow-sm"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
