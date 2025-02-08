"use client";

import Editor from "./editor";
import Toolbar from "./toolbar";
import Navbar from "./navbar";
import { Room } from "./Room";
import { Preloaded,usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DocumentProps {
  preloadDocument: Preloaded<typeof api.document.getById>;
}

export default async function Document({ preloadDocument }: DocumentProps) {

    const document = usePreloadedQuery(preloadDocument);
  
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 print:hidden bg-[#FAFBFD]">
          <Navbar data={document} />
          <Toolbar />
        </div>

        <div className="pt-[144px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
}
