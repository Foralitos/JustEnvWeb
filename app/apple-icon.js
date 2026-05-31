import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E1013",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38E08A",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 118,
          letterSpacing: "-6px",
        }}
      >
        ›_
      </div>
    ),
    { ...size }
  );
}
