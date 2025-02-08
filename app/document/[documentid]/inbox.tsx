"use client";
import { Bell } from "lucide-react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { ClientSideSuspense } from "@liveblocks/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
      <>
        <Button variant="ghost" className="relative" size={"icon"} disabled>
            <Bell className="size-5" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
      </>
      
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative" size={"icon"}>
            <Bell className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-xs font-medium">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="text-center text-sm text-muted-foreground w-[400px] p-2">
              No Notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};
