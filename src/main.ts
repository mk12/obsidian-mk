// Copyright 2022 Mitchell Kember. Subject to the MIT License.

import { Plugin } from "obsidian";
import {
  copyLineDown,
  copyLineUp,
  cycleChecklistStatus,
  deleteSelectedLines,
  joinLines,
  selectLine,
} from "./actions";

export default class MyPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "deleteLine",
      name: "Delete line",
      hotkeys: [
        {
          modifiers: ["Mod", "Shift"],
          key: "K",
        },
      ],
      editorCallback: (editor) => deleteSelectedLines(editor),
    });

    this.addCommand({
      id: "joinLines",
      name: "Join lines",
      hotkeys: [
        {
          modifiers: ["Ctrl"],
          key: "J",
        },
      ],
      editorCallback: (editor) => joinLines(editor),
    });

    this.addCommand({
      id: "duplicateLine",
      name: "Duplicate line",
      hotkeys: [
        {
          modifiers: ["Mod", "Shift"],
          key: "D",
        },
      ],
      editorCallback: (editor) => copyLineDown(editor),
    });

    this.addCommand({
      id: "copyLineUp",
      name: "Copy line up",
      hotkeys: [
        {
          modifiers: ["Alt", "Shift"],
          key: "ArrowUp",
        },
      ],
      editorCallback: (editor) => copyLineUp(editor),
    });

    this.addCommand({
      id: "copyLineDown",
      name: "Copy line down",
      hotkeys: [
        {
          modifiers: ["Alt", "Shift"],
          key: "ArrowDown",
        },
      ],
      editorCallback: (editor) => copyLineDown(editor),
    });

    this.addCommand({
      id: "selectLine",
      name: "Select line",
      hotkeys: [
        {
          modifiers: ["Mod"],
          key: "L",
        },
      ],
      editorCallback: (editor) => selectLine(editor),
    });

    this.addCommand({
      id: "cycleChecklistStatus",
      name: "Cycle checklist status",
      hotkeys: [
        {
          modifiers: ["Mod", "Shift"],
          key: "Enter",
        },
      ],
      editorCallback: (editor) => cycleChecklistStatus(editor),
    });
  }
}
