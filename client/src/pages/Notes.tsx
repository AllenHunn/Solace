import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import { Note } from "../entities/Note";
import { NoteEditor } from "../components/NoteEditor";

export function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:3333/api/note', { method: 'GET', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
        .then(response => response.json())
        .then(data => setNotes(data.filter((note: Note) => note.content.includes(search))));
    }, [search]);

    const createNote = (note: Note) => {
        fetch('http://localhost:3333/api/note', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, body: JSON.stringify({ title: note.title, content: note.content })})
        .then(response => response.json())
        .then(data => setNotes([...notes, data]));
    };

    const updateNote = (note: Note) => {
        fetch('http://localhost:3333/api/note/' + note.id, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, body: JSON.stringify(note)})
        .then(() => setNotes(notes.map(n => n.id === note.id ? note : n)));
    }

    const deleteNote = (note: Note) => {
        fetch('http://localhost:3333/api/note/' + note.id, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
        .then(() => setNotes(notes.filter(n => n.id !== note.id)));
    }

    return (
        <div>
            <h1>Notes</h1>
            Search: <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <br />
                {notes.map(note => (
                    <div className="add-padding">
                        <NoteCard key={note.id} note={note} updateNote={updateNote} deleteNote={deleteNote} />
                    </div>
                ))}
            <NoteEditor note={null} noteChanged={createNote} />
        </div>
    );
}