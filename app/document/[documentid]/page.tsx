import Editor from "./editor";
import Toolbar from "./toolbar";
import Navbar from "./navbar";
import { Room } from "./Room";
import { Id } from "@/convex/_generated/dataModel";
import Document from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
interface DocumentIdpageProps {
  params: Promise<{
    documentid: Id<"document">;
  }>;
}

export default async function DocumentIdpage({ params }: DocumentIdpageProps) {
  const { documentid } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const preloadedDocument = await preloadQuery(
    api.document.getById,
    { id: documentid },
    { token }
  );

  if (!preloadedDocument) {
    throw new Error("Document not found");
  }
  return <Document preloadDocument={preloadedDocument} />;
}
