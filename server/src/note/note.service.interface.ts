import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './note.entity';

export interface INoteService {
  findAll(): Promise<Note[]>;
  findOne(id: number): Promise<Note>;
  create(note: CreateNoteDto): Promise<Note>;
  update(id: number, note: UpdateNoteDto): Promise<Note>;
  remove(id: number): Promise<void>;
}

export const INoteService = Symbol('INoteService');
