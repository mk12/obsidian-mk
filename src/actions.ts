// Copyright 2022 Mitchell Kember. Subject to the MIT License.

import { Editor } from "obsidian";
import {
  getLineEndPos,
  getLineStartPos,
  getSelectionBoundaries,
} from "./utils";

export function deleteSelectedLines(editor: Editor) {
  const selections = editor.listSelections();
  if (selections.length === 0) {
    return;
  }
  const { from, to } = getSelectionBoundaries(selections[0]);
  if (to.line === editor.lastLine()) {
    editor.replaceRange(
      "",
      getLineEndPos(from.line - 1, editor),
      getLineEndPos(to.line, editor),
    );
  } else {
    editor.replaceRange(
      "",
      getLineStartPos(from.line),
      getLineStartPos(to.line + 1),
    );
  }
}

export function joinLines(editor: Editor) {
  const { line } = editor.getCursor();
  const contentsOfNextLine = editor.getLine(line + 1).trimStart();
  const endOfCurrentLine = getLineEndPos(line, editor);
  const endOfNextLine = getLineEndPos(line + 1, editor);
  editor.replaceRange(
    contentsOfNextLine.length > 0
      ? " " + contentsOfNextLine
      : contentsOfNextLine,
    endOfCurrentLine,
    endOfNextLine,
  );
  editor.setSelection(endOfCurrentLine);
}

export function copyLineUp(editor: Editor) {
  const selections = editor.listSelections();
  if (selections.length === 0) {
    return;
  }
  const { from, to } = getSelectionBoundaries(selections[0]);
  const fromLineStart = getLineStartPos(from.line);
  const toLineEnd = getLineEndPos(to.line, editor);
  const contentsOfSelectedLines = editor.getRange(fromLineStart, toLineEnd);
  editor.replaceRange("\n" + contentsOfSelectedLines, toLineEnd);
}

export function copyLineDown(editor: Editor) {
  const selections = editor.listSelections();
  if (selections.length === 0) {
    return;
  }
  const { from, to } = getSelectionBoundaries(selections[0]);
  const fromLineStart = getLineStartPos(from.line);
  const toLineEnd = getLineEndPos(to.line, editor);
  const contentsOfSelectedLines = editor.getRange(fromLineStart, toLineEnd);
  editor.replaceRange(contentsOfSelectedLines + "\n", fromLineStart);
}

export function selectLine(editor: Editor) {
  const selections = editor.listSelections();
  if (selections.length === 0) {
    return;
  }
  const { from, to } = getSelectionBoundaries(selections[0]);
  const startOfCurrentLine = getLineStartPos(from.line);
  // If a line is already selected, expand the selection to the next line.
  const startOfNextLine = getLineStartPos(to.line + 1);
  editor.setSelection(startOfCurrentLine, startOfNextLine);
}

export function cycleChecklistStatus(editor: Editor) {
  const selections = editor.listSelections();
  if (selections.length === 0) {
    return;
  }
  const { from, to } = getSelectionBoundaries(selections[0]);
  if (from.line !== to.line) {
    return;
  }
  const fromLineStart = getLineStartPos(from.line);
  const fromLineEnd = getLineEndPos(from.line, editor);
  const contentsOfLine = editor.getRange(fromLineStart, fromLineEnd);
  const match = /^(\s*- \[)(.)\] /.exec(contentsOfLine);
  if (!match) {
    return;
  }
  const symbols = [" ", "x", "o", "-"];
  const oldSymbol = match[2];
  const index = symbols.indexOf(oldSymbol);
  let newSymbol;
  if (index === -1) {
    newSymbol = " ";
  } else {
    newSymbol = symbols[(index + 1) % symbols.length];
  }
  const untilSymbol = {
    line: from.line,
    ch: fromLineStart.ch + match[0].length - 2,
  };
  editor.replaceRange(`${match[1]}${newSymbol}`, fromLineStart, untilSymbol);
}
