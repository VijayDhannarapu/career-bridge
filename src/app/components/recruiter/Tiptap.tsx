"use client"

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


export default function Tiptap(){
    const editor = useEditor({
        extensions:[
            StarterKit,
        ],
        content: "<p>Hello Vijay</p>",
        immediatelyRender: false
    })
    return <EditorContent editor={editor}/>
}