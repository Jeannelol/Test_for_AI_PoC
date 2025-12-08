import { AlertTriangle, X } from "lucide-react";

interface ComplianceWarningProps {
  message: string;
  type?: "warning" | "block";
  onDismiss?: () => void;
}

export function ComplianceWarning({ message, type = "warning", onDismiss }: ComplianceWarningProps) {
  if (type === "block") {
    return (
      <div className="bg-[#FFF3E0] border-2 border-[#FF9800] rounded-xl p-4 flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-[#E65100] mb-1">
            <strong>⚠️ 输入受限</strong>
          </div>
          <div className="text-xs text-[#E65100]/80 leading-relaxed">
            {message}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 w-6 h-6 rounded hover:bg-[#FF9800]/10 transition-colors flex items-center justify-center text-[#E65100]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#E3F2FD] border border-[#2196F3]/20 rounded-xl p-4 flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 bg-[#2196F3] rounded-full flex items-center justify-center">
        <AlertTriangle className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-[#0D47A1] leading-relaxed">
          {message}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 w-6 h-6 rounded hover:bg-[#2196F3]/10 transition-colors flex items-center justify-center text-[#0D47A1]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function ComplianceResponseBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] border border-[#4CAF50]/20 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-7 h-7 bg-[#4CAF50] rounded-full flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-[#2E7D32] mb-1">
            <strong>📋 合规提示</strong>
          </div>
        </div>
      </div>
      <div className="text-sm text-[#33691E] leading-relaxed pl-10">
        {children}
      </div>
    </div>
  );
}
