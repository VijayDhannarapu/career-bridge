"use client";

import { useState } from "react";
import {
    useEditor,
    EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./Toolbar";

import "./RichTextEditor.css";

type RichTextEditorProps = {
    name?: string;
    defaultValue?: string;
};

export default function RichTextEditor({
    name = "description",
    defaultValue = "",
}: RichTextEditorProps) {

    const [html, setHtml] = useState(defaultValue)

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: defaultValue,
        immediatelyRender: false,
        onUpdate({ editor }) {
            setHtml(editor.getHTML())
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="rte">

            <Toolbar editor={editor}/>

            <EditorContent editor={editor}/>
            <input type="hidden" name={name} defaultValue={html}
            />
        </div>
    );
}