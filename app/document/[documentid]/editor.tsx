"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import Taskitem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from '@tiptap/extension-image'
// import ImageResize from 'tiptap/extension-image-resize'


const Tiptap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left:56px; pading-right:56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text print:w-full print:min-w-0",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      Taskitem.configure({
        nested: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Table,
      Image,
      // ImageResize
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#FAFBFD] px-4 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
