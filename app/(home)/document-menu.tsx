import { ExternalLinkIcon, FilePenIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import 
{   
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RemoveDialog from "@/components/ui/remove-dialog";
import { TrashIcon } from "lucide-react";
import RenameDialog from "@/components/ui/rename-dialog";


interface DocumentMenuProps {
    onNewTabClick: (id: Id<"document">) => void
    documentId: Id<"document">
    title: string

}

export default function DocumentMenu({
    onNewTabClick,
    documentId,
    title,
}: DocumentMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="rounded-full">
                    <MoreVertical className="size-4"/>
                </Button>       
            </DropdownMenuTrigger>
            
            <DropdownMenuContent>
                
            <RenameDialog  documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer"
                        
                    >
                        <FilePenIcon className="size-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
            </RenameDialog>
                <RemoveDialog  documentId={documentId} >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-500 cursor-pointer"
                        
                    >
                        <TrashIcon className="size-4 mr-2" />
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem
                    onClick={() => onNewTabClick(documentId)}
                    className="cursor-pointer text-blue-600"
                >
                    <ExternalLinkIcon className="size-4 mr-2" />
                   Open in new tab 
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}