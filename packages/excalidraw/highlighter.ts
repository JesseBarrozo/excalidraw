import { isTransparent } from "@excalidraw/common";

import type {
  ExcalidrawElement,
  ExcalidrawRectangleElement,
} from "@excalidraw/element/types";

export const HIGHLIGHTER_DEFAULT_COLOR =
  "#99d5ff" as ExcalidrawElement["backgroundColor"];
export const HIGHLIGHTER_STROKE_WIDTH = 6;
export const HIGHLIGHTER_ROUGHNESS = 2;

export const HIGHLIGHTER_ELEMENT_CUSTOM_DATA = {
  isHighlighter: true,
} as const;

export const isHighlighterElement = (
  element: ExcalidrawElement | null | undefined,
): element is ExcalidrawRectangleElement =>
  element?.type === "rectangle" && element.customData?.isHighlighter === true;

export const getHighlighterBackgroundColor = (
  color: ExcalidrawElement["backgroundColor"],
) => (isTransparent(color) ? HIGHLIGHTER_DEFAULT_COLOR : color);
