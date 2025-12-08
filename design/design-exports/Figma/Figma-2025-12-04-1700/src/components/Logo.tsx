export function Logo({ size = 40, variant = "full" }: { size?: number; variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chat bubble base */}
        <path
          d="M8 12C8 9.79086 9.79086 8 12 8H36C38.2091 8 40 9.79086 40 12V28C40 30.2091 38.2091 32 36 32H26L18 38V32H12C9.79086 32 8 30.2091 8 28V12Z"
          fill="url(#gradient1)"
        />
        
        {/* Candlestick chart elements */}
        {/* Stick 1 - Down */}
        <rect x="14" y="16" width="1.5" height="10" fill="#AD1627" opacity="0.9" />
        <rect x="12.5" y="18" width="4.5" height="5" fill="#AD1627" rx="0.5" />
        
        {/* Stick 2 - Up */}
        <rect x="20.25" y="14" width="1.5" height="12" fill="#0FA958" opacity="0.9" />
        <rect x="18.75" y="16" width="4.5" height="6" fill="#0FA958" rx="0.5" />
        
        {/* Stick 3 - Down */}
        <rect x="26.5" y="18" width="1.5" height="8" fill="#AD1627" opacity="0.9" />
        <rect x="25" y="20" width="4.5" height="4" fill="#AD1627" rx="0.5" />
        
        {/* Stick 4 - Up */}
        <rect x="32.75" y="15" width="1.5" height="10" fill="#0FA958" opacity="0.9" />
        <rect x="31.25" y="17" width="4.5" height="5" fill="#0FA958" rx="0.5" />
        
        <defs>
          <linearGradient id="gradient1" x1="8" y1="8" x2="40" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D3A66" />
            <stop offset="1" stopColor="#0A2F54" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chat bubble base */}
        <path
          d="M8 12C8 9.79086 9.79086 8 12 8H36C38.2091 8 40 9.79086 40 12V28C40 30.2091 38.2091 32 36 32H26L18 38V32H12C9.79086 32 8 30.2091 8 28V12Z"
          fill="url(#gradient2)"
        />
        
        {/* Candlestick chart elements */}
        <rect x="14" y="16" width="1.5" height="10" fill="#AD1627" opacity="0.9" />
        <rect x="12.5" y="18" width="4.5" height="5" fill="#AD1627" rx="0.5" />
        
        <rect x="20.25" y="14" width="1.5" height="12" fill="#0FA958" opacity="0.9" />
        <rect x="18.75" y="16" width="4.5" height="6" fill="#0FA958" rx="0.5" />
        
        <rect x="26.5" y="18" width="1.5" height="8" fill="#AD1627" opacity="0.9" />
        <rect x="25" y="20" width="4.5" height="4" fill="#AD1627" rx="0.5" />
        
        <rect x="32.75" y="15" width="1.5" height="10" fill="#0FA958" opacity="0.9" />
        <rect x="31.25" y="17" width="4.5" height="5" fill="#0FA958" rx="0.5" />
        
        <defs>
          <linearGradient id="gradient2" x1="8" y1="8" x2="40" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D3A66" />
            <stop offset="1" stopColor="#0A2F54" />
          </linearGradient>
        </defs>
      </svg>
      <div className="whitespace-nowrap">
        <span className="text-[#1E1E1E]">港股市场信息助手</span>
      </div>
    </div>
  );
}