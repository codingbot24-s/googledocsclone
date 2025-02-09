import { Id } from "@/convex/_generated/dataModel";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";
interface DocumentInputProps {
  title: string;
  id: Id<"document">;
}
export default function DocumentInput({ title, id }: DocumentInputProps) {
    
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const mutate = useMutation(api.document.updateById);

  const status = useStatus();

  const showloader = isPending || status === "connecting" || status === "reconnecting"; 
  const showError = status === "disconnected";

  const debouncedUpdate = useDebounce((value: string) => {
    if (value == title) return;

    setIsPending(true);

    mutate({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
      })
      .catch(() => {
        toast.error("Failed to update document title");
      })
      .finally(() => {
        setIsPending(false);
      });
    debouncedUpdate(value);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Failed to update document title");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    // TODO: Debounce value
  };
  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black ppx-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {
        !showloader && !showError && 
        (
           <BsCloudCheck className="size-4"/> 
        )
      }
      {
        isError && <BsCloudSlash className="size-4" />
      }
      {
        showloader && <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
      }
    </div>
  );
}
