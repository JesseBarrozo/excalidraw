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

  it("shows background, fill, and transparency controls", () => {
    API.setAppState({
      currentItemBackgroundColor: COLOR_PALETTE.transparent,
    });
    Keyboard.keyPress(KEYS.M);

    expect(queryByTestId(document.body, "fill-hachure")).not.toBeNull();
    expect(queryByTestId(document.body, "fill-cross-hatch")).not.toBeNull();
    expect(queryByTestId(document.body, "fill-solid")).not.toBeNull();
    expect(queryByTestId(document.body, "opacity")).not.toBeNull();

    togglePopover("Background");
    expect(queryByTestId(document.body, "color-transparent")).toBeNull();
  });

  it("draws with the reference blue and remains active", () => {
    API.setAppState({
      currentItemBackgroundColor: COLOR_PALETTE.transparent,
    });
    Keyboard.keyPress(KEYS.M);

    mouse.downAt(30, 30);
    mouse.moveTo(230, 90);
    mouse.upAt();

    const highlighter = h.elements[0] as ExcalidrawRectangleElement;
    expect(highlighter.type).toBe("rectangle");
    expect(highlighter.backgroundColor).toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.strokeColor).toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.strokeWidth).toBe(HIGHLIGHTER_STROKE_WIDTH);
    expect(highlighter.strokeStyle).toBe("solid");
    expect(highlighter.roughness).toBe(HIGHLIGHTER_ROUGHNESS);
    expect(highlighter.roundness).toBeNull();
    expect(h.state.activeTool.type).toBe("highlighter");
    expect(API.getSelectedElements()).toEqual([]);
  });

  it("applies panel options and places the highlight behind intersecting text", () => {
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
    }) as ExcalidrawTextElement;
    API.setElements([background, text]);

    Keyboard.keyPress(KEYS.M);
    fireEvent.click(queryByTestId(document.body, "fill-solid")!);
    fireEvent.change(queryByTestId(document.body, "opacity")!, {
      target: { value: "55" },
    });

    togglePopover("Background");
    fireEvent.click(queryByTestId(document.body, "color-blue")!);

    mouse.downAt(60, 50);
    mouse.moveTo(260, 110);
    mouse.upAt();

    const highlighter = h.elements.find(
      (element) => element.id !== background.id && element.id !== text.id,
    ) as ExcalidrawRectangleElement;

    expect(highlighter).toBeDefined();
    expect(highlighter.backgroundColor).not.toBe(HIGHLIGHTER_DEFAULT_COLOR);
    expect(highlighter.fillStyle).toBe("solid");
    expect(highlighter.opacity).toBe(55);
    expect(h.elements.map((element) => element.id)).toEqual([
      background.id,
      highlighter.id,
      text.id,
    ]);
  });
});
