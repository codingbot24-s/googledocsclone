"use client"
import Navbar from "./navbar"
import TemplateGallery from "./template-gallery"
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import DocumentsTable from "./document-table"  
export default function Home() {

  // TODO : error pagination

  const {results, status, loadMore} = usePaginatedQuery(api.document.get, {}, {initialNumItems: 10});
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
         <DocumentsTable
           documents={results}
           loadMore={loadMore}
           status={status}
         />
      </div>  
    </div>
  ) 
}