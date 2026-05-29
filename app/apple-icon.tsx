import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ padding: "16px" }}
        >
          <defs>
            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E8C6" />
              <stop offset="100%" stopColor="#00A896" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF099" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#8A6E24" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E8C6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Glowing outer circle / border */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#glowGrad)"
            strokeWidth="4"
            strokeDasharray="8 4"
          />

          {/* Interlocking geometric N */}
          {/* Left stem */}
          <rect
            x="25"
            y="24"
            width="10"
            height="52"
            rx="4"
            fill="url(#tealGrad)"
          />

          {/* Right stem */}
          <rect
            x="65"
            y="24"
            width="10"
            height="52"
            rx="4"
            fill="url(#tealGrad)"
          />

          {/* Diagonal connector: Gold ribbon */}
          <path
            d="M30 26 L 70 74"
            stroke="url(#goldGrad)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Corner tech dots */}
          <circle cx="70" cy="26" r="4" fill="#C9A84C" />
          <circle cx="30" cy="74" r="4" fill="#00E8C6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
