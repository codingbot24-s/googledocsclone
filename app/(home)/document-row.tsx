
import { TableRow, TableCell } from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { Building2Icon } from "lucide-react";
import { SiGoogledocs  } from "react-icons/si";
import { CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import DocumentMenu from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
    document: Doc<"document">    
}


export default function DocumentRow({ document }: DocumentRowProps) {

    const onNewTabClick = (id: string) => {
        window.open(`/document/${id}`, "_blank")
    }

    const router = useRouter()
    
    const onRowClick = (id: string) => {
        router.push(`/document/${id}`)
    }

    return (
        <TableRow
            className="cursor-pointer"
            onClick={() => onRowClick(document._id)}
        >
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "yyyy-MM-dd")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu 
                    documentId={document._id}
                    title={document.title}
                    onNewTabClick={onNewTabClick}
                />
            </TableCell>
        </TableRow>
    )
}
