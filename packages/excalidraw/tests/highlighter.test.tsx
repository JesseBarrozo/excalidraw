import { fireEvent, queryByTestId } from "@testing-library/react";

import { COLOR_PALETTE, KEYS } from "@excalidraw/common";

import type {
  ExcalidrawRectangleElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";

import {
  HIGHLIGHTER_DEFAULT_COLOR,
  HIGHLIGHTER_ROUGHNESS,
  HIGHLIGHTER_STROKE_WIDTH,
  isHighlighterElement,
} from "../highlighter";
import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import { GlobalTestState, render, togglePopover } from "./test-utils";

const { h } = window;

const mouse = new Pointer("mouse");

const selectHighlighterFromExtraTools = () => {
  fireEvent.click(
    GlobalTestState.renderResult.container.querySelector(
      ".App-toolbar__extra-tools-trigger",
    )!,
  );
  fireEvent.click(
    document.querySelector<HTMLButtonElement>(
      '[data-testid="toolbar-highlighter"]',
    )!,
  );
};

describe("highlighter tool", () => {
  beforeEach(async () => {
    mouse.reset();
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  it("is available from the extra tools menu and through the M shortcut", () => {
    expect(
      GlobalTestState.renderResult.container.querySelector(
        '[data-testid="toolbar-highlighter"]',
      ),
    ).toBeNull();

    selectHighlighterFromExtraTools();
    expect(h.state.activeTool.type).toBe("highlighter");

    UI.clickTool("selection");
    Keyboard.keyPress(KEYS.M);
    expect(h.state.activeTool.type).toBe("highlighter");
  });

  it("shows background and transparency controls without fill options", () => {
    API.setAppState({
      currentItemBackgroundColor: COLOR_PALETTE.transparent,
    });
    Keyboard.keyPress(KEYS.M);

    expect(queryByTestId(document.body, "fill-hachure")).toBeNull();
    expect(queryByTestId(document.body, "fill-cross-hatch")).toBeNull();
    expect(queryByTestId(document.body, "fill-solid")).toBeNull();
    expect(queryByTestId(document.body, "opacity")).not.toBeNull();

    togglePopover("Background");
    expect(queryByTestId(document.body, "color-transparent")).toBeNull();
  });

  it("draws with the reference blue and remains active", () => {
    const text = API.createElement({
      type: "text",
      x: 20,
      y: 20,
      width: 240,
      height: 25,
      text: "Highlighted text",
    });
    API.setElements([text]);
    API.setAppState({
      currentItemBackgroundColor: COLOR_PALETTE.transparent,
    });
    Keyboard.keyPress(KEYS.M);

    mouse.downAt(30, 30);
    mouse.moveTo(230, 90);
    mouse.upAt();

    const highlighter = h.elements.find(
      (element) => element.id !== text.id,
    ) as ExcalidrawRectangleElement;
    expect(highlighter.type).toBe("rectangle");
    expect(highlighter.backgroundColor).toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.strokeColor).toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.strokeWidth).toBe(HIGHLIGHTER_STROKE_WIDTH);
    expect(highlighter.strokeStyle).toBe("solid");
    expect(highlighter.fillStyle).toBe("solid");
    expect(highlighter.roughness).toBe(HIGHLIGHTER_ROUGHNESS);
    expect(highlighter.roundness).toBeNull();
    expect(h.state.activeTool.type).toBe("highlighter");
    expect(API.getSelectedElements()).toEqual([]);
  });

  it("starts behind text at font size and only lets the user set its width", () => {
    const background = API.createElement({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 400,
      height: 200,
    });
    const text = API.createElement({
      type: "text",
      x: 80,
      y: 60,
      width: 160,
      height: 40,
      text: "Highlighted text",
      fontSize: 32,
    }) as ExcalidrawTextElement;
    API.setElements([background, text]);

    Keyboard.keyPress(KEYS.M);
    fireEvent.change(queryByTestId(document.body, "opacity")!, {
      target: { value: "55" },
    });

    togglePopover("Background");
    fireEvent.click(queryByTestId(document.body, "color-blue")!);

    mouse.downAt(90, 75);

    const highlighterAtStart = h.elements.find(
      (element) => element.id !== background.id && element.id !== text.id,
    ) as ExcalidrawRectangleElement;
    const expectedY = text.y + (text.height - text.fontSize) / 2;

    expect(highlighterAtStart.y).toBe(expectedY);
    expect(highlighterAtStart.height).toBe(text.fontSize);
    expect(isHighlighterElement(highlighterAtStart)).toBe(true);
    expect(
      GlobalTestState.renderResult.container.querySelector(
        "canvas.excalidraw__canvas:not(.static):not(.interactive)",
      ),
    ).toBeNull();
    expect(h.elements.map((element) => element.id)).toEqual([
      background.id,
      highlighterAtStart.id,
      text.id,
    ]);

    mouse.moveTo(260, 180);

    expect(highlighterAtStart.y).toBe(expectedY);
    expect(highlighterAtStart.height).toBe(text.fontSize);
    expect(highlighterAtStart.width).toBe(170);

    mouse.upAt();

    const highlighter = h.elements.find(
      (element) => element.id !== background.id && element.id !== text.id,
    ) as ExcalidrawRectangleElement;

    expect(highlighter).toBeDefined();
    expect(highlighter.backgroundColor).not.toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.fillStyle).toBe("solid");
    expect(highlighter.opacity).toBe(55);
    expect(highlighter.y).toBe(expectedY);
    expect(highlighter.height).toBe(text.fontSize);
    expect(h.elements.map((element) => element.id)).toEqual([
      background.id,
      highlighter.id,
      text.id,
    ]);
  });

  it("does not create a freely resizable shape away from text", () => {
    Keyboard.keyPress(KEYS.M);

    mouse.downAt(30, 30);
    mouse.moveTo(230, 130);
    mouse.upAt();

    expect(h.elements).toEqual([]);
    expect(h.state.activeTool.type).toBe("highlighter");
  });
});
