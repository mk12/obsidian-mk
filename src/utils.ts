// Copyright 2022 Mitchell Kember. Subject to the MIT License.

import { Editor, EditorPosition, EditorSelection } from "obsidian";

export function getLineStartPos(line: number): EditorPosition {
  return {
    line,
    ch: 0,
  };
}

export function getLineEndPos(line: number, editor: Editor): EditorPosition {
  return {
    line,
    ch: editor.getLine(line).length,
  };
}

export function getSelectionBoundaries(selection: EditorSelection) {
  let { anchor: from, head: to } = selection;
  // In case the user selects upwards.
  if (from.line > to.line) {
    [from, to] = [to, from];
  }
  return { from, to };
}

export function getFullLine(line: number, editor: Editor): string {
  return editor.getRange(getLineStartPos(line), getLineEndPos(line, editor));
}
