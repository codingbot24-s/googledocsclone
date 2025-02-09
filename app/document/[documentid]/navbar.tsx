"use client";

import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./document-input";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar";
import {
  TrashIcon,
  FilePenIcon,
  FileIcon,
  FileJsonIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  PrinterIcon,
  Undo2Icon,
  Redo2Icon,
  TextIcon,
  BoldIcon,
  ItalicIcon,
  Underline,
  UnderlineIcon,
  StrikethroughIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/app/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatar";
import { Inbox } from "./inbox";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RemoveDialog from "@/components/ui/remove-dialog";
import RenameDialog from "@/components/ui/rename-dialog";
interface NavbarProps {
  data: Doc<"document">;
}

export default function Navbar({data}: NavbarProps) {
  const { editor } = useEditorStore();

  const InsertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = ({ blob, fileName }: { blob: Blob; fileName: string }) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload({ blob, fileName: `${data.title}.json` });
  };

  const onSaveHtml = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload({ blob, fileName: `${data.title}.html` });
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload({ blob, fileName: `${data.title}.txt` });
  };

  const router = useRouter()  

  const mutation = useMutation(api.document.create);
  
  const onNewDocument = () => {
    mutation({ title: "Untitled Document",initialContent: "" })
    .then((id) => {
      toast.success("New document created");
      router.push(`/document/${id}`);
    })
    .catch(() => {
      toast.error("Failed to create new document");
    })
    
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src={"/icon.png"} alt="logo" width={36} height={36}></Image>
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        Json
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id } initialTitle={data.title}>
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  </RenameDialog>
                  <MenubarSeparator />
                  <RemoveDialog documentId={data._id}>
                  <MenubarItem
                    onClick={(e) => e.stopPropagation()}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => InsertTable({ rows: 1, cols: 1 })}
                      >
                        1 X 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => InsertTable({ rows: 2, cols: 2 })}
                      >
                        2 X 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => InsertTable({ rows: 3, cols: 3 })}
                      >
                        3 X 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => InsertTable({ rows: 4, cols: 4 })}
                      >
                        4 X 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Inbox/>
        <Avatars />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
