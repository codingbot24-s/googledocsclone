"use client";

import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

interface RemoveDialogProps {
  documentId: Id<"document">;
  children: React.ReactNode;
}

export default function RemoveDialog({
  documentId,
  children,
}: RemoveDialogProps) {
  const remove = useMutation(api.document.removeById);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and all data will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={async (e) => {
              e.stopPropagation();
              setIsDeleting(true);
              remove({ id: documentId })
                .catch((e) => {
                  toast.error(e.message);
                })
                .then(() => {
                  toast.success("Document removed");
                })
                .finally(() => setIsDeleting(false));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
