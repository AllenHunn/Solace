import { Injectable } from '@nestjs/common';
import { INoteService } from './note.service.interface';
import { Note } from './note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService implements INoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}
  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }
  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    return note;
  }
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    note.createdAt = new Date();
    note.updatedAt = new Date();
    return await this.noteRepository.save(note);
  }
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    note.updatedAt = new Date();
    return await this.noteRepository.save(note);
  }
  async remove(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Note with id ${id} not found`);
    }
  }
}

@Injectable()
export class NoteTestService implements INoteService {
  private readonly notes: Note[] = [];

  async findAll(): Promise<Note[]> {
    return this.notes;
  }
  async findOne(id: number): Promise<Note> {
    const note = this.notes[id - 1];
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    return note;
  }
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = new Note();
    Object.assign(note, createNoteDto);
    note.id = this.notes.length + 1;
    note.createdAt = new Date();
    note.updatedAt = new Date();
    this.notes.push(note);
    return note;
  }
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    note.updatedAt = new Date();
    return note;
  }
  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
    } catch (e) {
      throw new Error(`Note with id ${id} not found`);
    }
    this.notes.splice(id - 1, 1);
  }
}
