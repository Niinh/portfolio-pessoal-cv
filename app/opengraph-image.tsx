import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Bruno Neves - Sistemas Web e Soluções Digitais";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#060809",
          color: "#f8fbff",
          display: "flex",
          fontFamily: "Arial",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ color: "#53f5c7", fontSize: 28, textTransform: "uppercase" }}>
            {siteConfig.name}
          </span>
          <h1 style={{ fontSize: 86, lineHeight: 1, margin: 0, maxWidth: 900 }}>
            Sistemas web modernos para vender, operar e crescer.
          </h1>
          <p style={{ color: "#a6b0b8", fontSize: 30, margin: 0 }}>
            SaaS, landing pages, automações, design e soluções digitais.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
