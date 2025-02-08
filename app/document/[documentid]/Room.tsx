"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {

  const params = useParams();

  return (
    // TODO add publicApiKey when using liveblocks
    <LiveblocksProvider 
      throttle={16}
      authEndpoint={"/api/liveblocks-auth"}
    >
      <RoomProvider id={params.documentid as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}