"use client";

import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type ColorResult, SketchPicker } from "react-color";
import {
  LucideIcon,
  Redo2Icon,
  Undo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  HighlighterIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h—7 shrink—0 flex flex-col items—center justify—center rounded—sm hover:bg—neutral-200/80 min-w-7 px—1.5 overflow—hidden text—sm"
          )}
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange}></SketchPicker>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h—7 shrink—0 flex flex-col items—center justify—center rounded—sm hover:bg—neutral-200/80 min-w-7 px—1.5 overflow—hidden text—sm"
          )}
        >
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{ backgroundColor: value }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange}></SketchPicker>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontsize: "16px" },
    { label: "Heading 1", value: 1, fontsize: "32px" },
    { label: "Heading 2", value: 2, fontsize: "24px" },
    { label: "Heading 3", value: 3, fontsize: "20px" },
    { label: "Heading 4", value: 4, fontsize: "18px" },
    { label: "Heading 5", value: 5, fontsize: "16px" },
  ];

  function getCurrentHeading() {
    for (let level = 1; level <= headings.length; level++) {
      if (editor?.isActive(`heading${level}`)) {
        return level;
      }
    }

    return "Normal text";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h—7 shrink—0 flex items—center justify—center rounded—sm hover:bg—neutral-200/80 min-w-7 shrink—0 px—1.5 overflow—hidden text—sm"
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontsize }) => (
          <button
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            key={value}
            className={cn(
              "flex items—center gap-x—2 px—2 py—1 rounded—sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (!editor?.isActive(`heading${value}`) && "bg-neutral-200/80")
            )}
            style={{ fontSize: fontsize }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h—7 shrink—0 flex items—center justify—between rounded—sm hover:bg—neutral-200/80 w-[120px] shrink—0 px—1.5 overflow—hidden text—sm]"
          )}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
            key={value}
            className={cn(
              "flex items—center gap-x—2 px—2 py—1 rounded—sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg—neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export default function Toolbar() {
  const { editor } = useEditorStore();
  console.log(editor);

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "spellcheck",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("comment"),
        isActive: false, // TODO : add comment feature
      },
      {
        label: "ListTodo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "RemoveFormat",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24-px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO Font Size*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO Link */}
      {/* TODO Image*/}
      {/* TODO Align  */}
      {/* TODO Line hieght */}
      {/* TODO List */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
