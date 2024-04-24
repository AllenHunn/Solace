import { Dialog, DialogContent, DialogTitle, Fab, IconButton } from "@mui/material";
import { Note } from "../entities/Note";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export function NoteEditor(props: { note: Note | null, noteChanged: (note: Note) => void }) {
    const [title, setTitle] = useState(props.note ? props.note.title : '');
    const [content, setContent] = useState(props.note ? props.note.content : '');
    const [open, setOpen] = useState(false);

    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setTitle(value);
        } else {
            setContent(value);
        }
    };

    const handleSave = () => {
        let note = props.note;
        if (note === null) {
            note = new Note('', '', '', '', '');
        }
        if (title.length === 0){
            alert('Title is required');
            return;
        }
        if (content.length < 20 || content.length > 300){
            alert('Content must be at least 20 characters and less than 300');
            return;
        }
        props.noteChanged({ ...note, title, content });
        handleClose();
    }

    return (
        <React.Fragment>
            { !props.note ? (
                <Fab onClick={handleOpen} color="primary" aria-label="Add new note" className="fab"><AddIcon /></Fab>
            ) : (
                <IconButton onClick={handleOpen} aria-label='Delete'><EditIcon /></IconButton>
            )
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.note ? 'Edit Note' : 'Create Note'}</DialogTitle>
                <DialogContent>
                    <div>
                        <input type="text" name="title" value={title} onChange={handleChange} required />
                        <textarea name="content" value={content} onChange={handleChange} maxLength={300} minLength={20} required />
                    </div>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}