import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

interface DocumentTableProps {
    documents: Doc<"document">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus
}


export default function DocumentTable({ documents, loadMore, status }: DocumentTableProps) {

    return (
     <div>
        hello from document table
     </div>   
    )
}