"use client";

import { ReactNode, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullscreenLoader from "@/components/ui/fullscreen-loader";
import { useState } from "react";
import { useMemo } from "react";
import { getUsers } from "./action";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [user, setUser] = useState<User[]>([]);

  const fetchUser = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUser(list);
      } catch {
        toast.error("Error fetching user");
      }
    },
    []
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    // TODO add publicApiKey when using liveblocks
    <LiveblocksProvider
      
      throttle={16}
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={({userIds}) => {
        return userIds.map((id) => user.find((user) => user.id === id)) ?? undefined;
      }}
      resolveMentionSuggestions={({text}) => {
        let filteredUsers = user;

        if (text) {
          filteredUsers = user.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentid as string}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label=" Room loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
