import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070c",
          color: "#22d3ee",
          fontFamily: "monospace",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        &gt;_
      </div>
    ),
    { ...size },
  );
}
