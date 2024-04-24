import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { INoteService } from './note.service.interface';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(
    @Inject(INoteService) private readonly noteService: INoteService,
  ) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(+id);
  }

  @Post()
  async create(@Body() createCatDto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(createCatDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.noteService.update(+id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.noteService.remove(+id);
  }
}
