import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ClearFormattingToolbarPlugin } from "@/components/editor/plugins/toolbar/clear-formatting-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";

export function Plugins() {
  const [, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <div className="flex w-full border-b border-input p-4">
        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <ClearFormattingToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <ElementFormatToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <FontColorToolbarPlugin />
              <FontBackgroundToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <FontFormatToolbarPlugin format="bold" />
              <FontFormatToolbarPlugin format="italic" />
              <FontFormatToolbarPlugin format="underline" />
              <FontFormatToolbarPlugin format="strikethrough" />
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <HistoryToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>

        <ToolbarPlugin>
          {({  }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto p-1">
              <LinkToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>
      </div>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="h-[400px]">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
    </div>
  );
}
