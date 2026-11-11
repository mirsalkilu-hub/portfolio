import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mirsal - Senior Frontend & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portrait = await readFile(join(process.cwd(), "public", "mirsal-profile.webp"));
const portraitSrc = `data:image/webp;base64,${portrait.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 76px",
          background: "#0b1020",
          color: "#f8fafc",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 680 }}>
          <div
            style={{
              display: "flex",
              color: "#22d3ee",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Portfolio | Makassar, Indonesia
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            Mirsal
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              color: "#cbd5e1",
              fontSize: 34,
              lineHeight: 1.3,
            }}
          >
            Senior Frontend &amp;
            <br />
            Full-Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#94a3b8",
              fontSize: 22,
            }}
          >
            React | Next.js | AEM Edge Delivery Services
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              color: "#22d3ee",
              fontSize: 18,
            }}
          >
            portofolio.gameskilu.com
          </div>
        </div>
        {/* ImageResponse needs a plain img for embedded local image data. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={portraitSrc}
          width={330}
          height={440}
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: 28,
            border: "2px solid #1e293b",
          }}
        />
      </div>
    ),
    size,
  );
}
