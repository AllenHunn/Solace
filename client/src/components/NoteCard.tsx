import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Note } from '../entities/Note';
import { CardActionArea, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteEditor } from './NoteEditor';

export function NoteCard(props: { note: Note, updateNote: (note: Note) => void, deleteNote: (note: Note) => void}) {
    const updatedAt = `Updated at: ${new Date(props.note.updatedAt).toLocaleString()}`;
    return (
        <Card className='MuiCard-root' sx={{ maxWidth: 'md', width:'sm' }}>
            <CardHeader title={props.note.title} subheader={updatedAt} />
            <CardContent>
                <p>{props.note.content}</p>
            </CardContent>
            <CardActionArea>
                <NoteEditor note={props.note} noteChanged={props.updateNote} />
                <IconButton onClick={() => props.deleteNote(props.note)} aria-label='Delete'><DeleteIcon /></IconButton>
            </CardActionArea>
        </Card>
    );
}
