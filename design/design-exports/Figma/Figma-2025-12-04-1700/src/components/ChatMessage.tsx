import { User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user";

  return (
    <div
      className={`flex gap-4 mb-6 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#0D3A66] to-[#0A2F54] rounded-lg flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`flex-1 max-w-3xl ${isUser ? "flex justify-end" : ""}`}
      >
        <div
          className={`rounded-2xl p-4 shadow-sm ${
            isUser
              ? "bg-[#0D3A66] text-white"
              : "bg-white border border-[#D5D9DE]"
          }`}
        >
          <div
            className={`whitespace-pre-wrap ${isUser ? "text-white" : "text-[#0A0F16]"}`}
          >
            {message.content.split("\n").map((line, i) => {
              // Handle bold text
              if (
                line.startsWith("**") &&
                line.endsWith("**")
              ) {
                return (
                  <div
                    key={i}
                    className={`mb-3 mt-3 font-medium ${isUser ? "text-white" : "text-[#0A0F16]"}`}
                  >
                    {line.replace(/\*\*/g, "")}
                  </div>
                );
              }

              // Handle list items
              if (line.startsWith("- ")) {
                return (
                  <div
                    key={i}
                    className={`ml-4 mb-1 ${isUser ? "text-white/90" : "text-[#0A0F16]"}`}
                  >
                    • {line.substring(2)}
                  </div>
                );
              }

              // Handle numbered lists
              if (/^\d+\./.test(line)) {
                return (
                  <div
                    key={i}
                    className={`ml-4 mb-2 ${isUser ? "text-white/90" : "text-[#0A0F16]"}`}
                  >
                    {line}
                  </div>
                );
              }

              // Handle inline bold with **text**
              const boldPattern = /\*\*(.*?)\*\*/g;
              if (boldPattern.test(line)) {
                const parts = line.split(boldPattern);
                return (
                  <div
                    key={i}
                    className={`mb-2 ${isUser ? "text-white/90" : "text-[#0A0F16]"}`}
                  >
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong
                          key={j}
                          className={
                            isUser
                              ? "text-white"
                              : "text-[#0A0F16]"
                          }
                        >
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </div>
                );
              }

              // Regular line
              return line ? (
                <div
                  key={i}
                  className={`mb-2 ${isUser ? "text-white/90" : "text-[#0A0F16]"}`}
                >
                  {line}
                </div>
              ) : (
                <div key={i} className="h-2" />
              );
            })}
          </div>
          <div
            className={`text-xs mt-2 ${isUser ? "text-white/60" : "text-[#A3A8B1]"}`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 bg-[#ECEFF3] border border-[#D5D9DE] rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-[#0D3A66]" />
        </div>
      )}
    </div>
  );
}