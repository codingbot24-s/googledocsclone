import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize : {
      setFontSize: (fontsize: string) => ReturnType,
      unsetFontFamily: () => ReturnType,
    }
  }
}

export const FontSizeExtension = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: "null",
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontsize: string) => ({chain} : any) => {
        return chain().setMark("textStyle", {fontsize}).run();
      },
      unsetFontFamily: () => ({chain}) => {
        return chain().setMark("textStyle",{fontsize : null}).removeEmptyTextStyle().run();
      }
    };
  },
});
 