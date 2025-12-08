import { useState } from "react";
import { X, User } from "lucide-react";

interface GuestIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (nickname: string) => void;
  guestId: string;
}

export function GuestIdentityModal({ isOpen, onClose, onConfirm, guestId }: GuestIdentityModalProps) {
  const [nickname, setNickname] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(nickname || `访客${guestId.slice(-4)}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl text-[#0A0F16] mb-2">欢迎使用港股信息助手</h2>
          <p className="text-sm text-[#A3A8B1] text-center">您正在以访客身份使用本服务</p>
        </div>

        <div className="mb-6">
          <div className="bg-[#F7F9FB] rounded-xl p-4 mb-4 border border-[#D5D9DE]">
            <div className="text-xs text-[#A3A8B1] mb-1">临时访客 ID</div>
            <div className="text-sm text-[#0A0F16] font-mono">{guestId}</div>
          </div>

          <div>
            <label className="block text-sm text-[#0A0F16] mb-2">
              设置昵称 <span className="text-[#A3A8B1]">（可选）</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="例如：小明"
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#D5D9DE] focus:border-[#0D3A66] focus:outline-none focus:ring-2 focus:ring-[#0D3A66]/10 transition-all text-[#0A0F16] placeholder-[#A3A8B1]"
            />
          </div>
        </div>

        <div className="bg-[#FFF7ED] border border-[#FFA726]/20 rounded-xl p-4 mb-6">
          <p className="text-xs text-[#E65100] leading-relaxed">
            ⚠️ <strong>隐私提示：</strong>访客会话数据仅存储在本地浏览器中。清除浏览器数据将丢失所有对话记录。本服务不收集个人身份信息。
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-[#D5D9DE] text-[#0A0F16] hover:bg-[#F7F9FB] transition-colors"
          >
            稍后设置
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 rounded-xl bg-[#0D3A66] hover:bg-[#2A7FF0] text-white transition-colors shadow-sm"
          >
            确认并继续
          </button>
        </div>

        <p className="text-xs text-[#A3A8B1] text-center mt-4">
          继续使用即表示您同意仅将本服务用于信息查询目的
        </p>
      </div>
    </div>
  );
}
