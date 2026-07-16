import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";

export const alt = "LunarTulip Lab — AI-native Research & Decision Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    new URL("../public/lunartulip-silver-emblem.png", import.meta.url),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "#111820",
        backgroundColor: "#f4f5f3",
        backgroundImage:
          "linear-gradient(rgba(17,24,32,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,32,.045) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 720,
          padding: "76px 0 72px 78px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: "#718c9f",
              boxShadow: "0 0 0 6px rgba(113,140,159,.13)",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-.02em" }}>
            LUNARTULIP LAB
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#71808a", fontSize: 15, letterSpacing: ".12em" }}>
            BUILD THE SYSTEM BEHIND CONVICTION.
          </span>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              lineHeight: 1.14,
              fontWeight: 700,
              letterSpacing: "-.045em",
            }}
          >
            <span>AI-native Research</span>
            <span>&amp; Decision Systems</span>
          </div>
          <span style={{ marginTop: 25, color: "#5f6e77", fontSize: 21 }}>
            Make every judgment a system asset for the next decision.
          </span>
        </div>

        <span style={{ color: "#83919a", fontSize: 14 }}>
          lunartuliplab.com
        </span>
      </div>

      <div
        style={{
          width: 480,
          height: 480,
          position: "absolute",
          right: 24,
          top: 75,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(113,140,159,.38)",
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(255,255,255,.98) 0 28%, rgba(201,220,229,.5) 50%, rgba(113,140,159,.12) 66%, transparent 72%)",
        }}
      >
        {/* ImageResponse requires a native image element for the embedded data URL. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={390}
          height={410}
          alt=""
          style={{ objectFit: "contain", filter: "drop-shadow(0 22px 22px rgba(29,42,52,.18))" }}
        />
      </div>
    </div>,
    size,
  );
}
