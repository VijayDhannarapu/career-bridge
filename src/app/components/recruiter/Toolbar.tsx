"use client";

import type { Editor } from "@tiptap/react";

type ToolbarProps = {
    editor: Editor;
};

export default function Toolbar({
    editor,
}: ToolbarProps) {

    return (
        <div className="toolbar">
            <select
                defaultValue="paragraph"
                onChange={(event) => {

                    const value =
                        event.target.value;

                    if (value === "paragraph") {

                        editor
                            .chain()
                            .focus()
                            .setParagraph()
                            .run();

                    }

                    if (value === "h1") {

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 1,
                            })
                            .run();

                    }

                    if (value === "h2") {

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 2,
                            })
                            .run();

                    }

                    if (value === "h3") {

                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 3,
                            })
                            .run();

                    }

                }}
            >
                <option value="paragraph">
                    Normal
                </option>

                <option value="h1">
                    Heading 1
                </option>

                <option value="h2">
                    Heading 2
                </option>

                <option value="h3">
                    Heading 3
                </option>
            </select>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
            >
                <strong>B</strong>
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
            >
                <em>I</em>
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run()
                }
            >
                <u>U</u>
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBulletList()
                        .run()
                }
            >
                •
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleOrderedList()
                        .run()
                }
            >
                1.
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                ↶
            </button>

            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                ↷
            </button>
        </div>
    );
}