import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { INoteService } from './note.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [
    {
      provide: INoteService,
      useClass: NoteService,
    },
  ],
})
export class NoteModule {}
