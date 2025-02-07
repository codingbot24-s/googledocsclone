
import { TableRow, TableCell } from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { Building2Icon, MoreVertical, Table } from "lucide-react";
import { SiGoogledocs  } from "react-icons/si";
import { CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
    document: Doc<"document">    
}


export default function DocumentRow({ document }: DocumentRowProps) {
    return (
        <TableRow
            className="cursor-pointer"
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
                <Button variant={"ghost"} size={"icon"} className="rounded-full">
                    <MoreVertical className="size-4"/>
                </Button>
            </TableCell>
        </TableRow>
    )
}
