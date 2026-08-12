const TEXT_PASTE_ANIMATION_INTERVAL = 30;
const TEXT_PASTE_MAX_ANIMATION_DURATION = 600;

const graphemeSegmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

export const splitTextIntoGraphemes = (text: string) => {
  if (!graphemeSegmenter) {
    return Array.from(text);
  }

  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment);
};

export const getTextPasteAnimationConfig = (graphemeCount: number) => {
  const maxFrameCount = Math.floor(
    TEXT_PASTE_MAX_ANIMATION_DURATION / TEXT_PASTE_ANIMATION_INTERVAL,
  );

  return {
    interval: TEXT_PASTE_ANIMATION_INTERVAL,
    graphemesPerFrame: Math.max(1, Math.ceil(graphemeCount / maxFrameCount)),
  };
};
