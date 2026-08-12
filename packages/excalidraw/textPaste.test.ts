import {
  getTextPasteAnimationConfig,
  splitTextIntoGraphemes,
} from "./textPaste";

describe("progressive text paste", () => {
  it("segments user-perceived characters without splitting emoji", () => {
    expect(splitTextIntoGraphemes("A👨‍👩‍👧‍👦é")).toEqual(["A", "👨‍👩‍👧‍👦", "é"]);
  });

  it("caps the animation duration for long text", () => {
    const config = getTextPasteAnimationConfig(1_000);

    expect(
      Math.ceil(1_000 / config.graphemesPerFrame) * config.interval,
    ).toBeLessThanOrEqual(2_000);
  });
});
