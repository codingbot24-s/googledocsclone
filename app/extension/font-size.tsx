import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize : {
      setFontSize: (fontSize: number) => ReturnType,
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
      setFontSize: (fontsize: number) => ({ chain }) => {
        return chain()
          .setMark("textStyle", { fontSize: `${fontsize}px` })
          .run();
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain()
          .setMark("textStyle", { fontSize: null })
          .removeEmptyTextStyle()
          .run();
      }
    };
  }
});
 