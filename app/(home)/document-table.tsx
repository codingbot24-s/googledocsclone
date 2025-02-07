import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import DocumentRow from "./document-row";

import 
{
    Table,
    TableHead,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,

} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";


interface DocumentTableProps {
    documents: Doc<"document">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus
}


export default function DocumentTable({ documents, loadMore, status }: DocumentTableProps) {

    return (
     <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
       {documents === undefined ? ( 
        <div className="flex justify-center items-center h-24">
            <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
       )
       : (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent border-none">
                    <TableHead>Name</TableHead>
                    <TableHead>&nbsp;</TableHead>
                    <TableHead className="hidden md:table-cell">Shared</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    
                </TableRow>
            </TableHeader>
            {documents.length === 0 ? (
                <TableBody>
                    <TableRow className="hover:bg-transparent ">
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                            No documents Found
                        </TableCell>
                    </TableRow>
                </TableBody>
            ): 
            (
                <TableBody>
                    {documents.map((doc) => (
                        <DocumentRow key={doc._id} document={doc} />
                    ))}
                </TableBody>
            )}
        </Table>
       )}
     </div>   
    )
}