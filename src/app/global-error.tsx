"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#FAF8F5", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#1F1F1F" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <div style={{ display: "inline-block", width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#fce8e0", color: "#E7040D", lineHeight: "56px", fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
              !
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 12px 0", letterSpacing: "-0.02em" }}>
              Service Interruption
            </h1>
            <p style={{ fontSize: "15px", color: "#52525b", lineHeight: "1.6", margin: "0 0 24px 0" }}>
              An unexpected system error occurred. Our engineering monitors have been alerted.
            </p>
            <button
              onClick={() => reset()}
              style={{ padding: "12px 24px", backgroundColor: "#E7040D", color: "#FFFFFF", border: "none", borderRadius: "0", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
            >
              Reload application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
