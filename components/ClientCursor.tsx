"use client";

import dynamic from "next/dynamic";

const SmoothCursor = dynamic(() => import("./SmoothCursor"), {
  ssr: false,
});

export default function ClientCursor() {
  return <SmoothCursor />;
}
