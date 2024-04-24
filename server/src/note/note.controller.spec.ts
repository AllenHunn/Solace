import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { INoteService } from './note.service.interface';
import { NoteTestService } from './note.service';

describe('NoteController', () => {
  let controller: NoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: INoteService,
          useClass: NoteTestService,
        },
      ],
    }).compile();

    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a note', async () => {
    const note = await controller.create({
      title: 'Test',
      content: 'Test',
    });
    expect(note.id).toEqual(1);
    expect(note.title).toEqual('Test');
    expect(note.content).toEqual('Test');
  });

  it('should find all notes', async () => {
    await controller.create({
      title: 'Test',
      content: 'Test',
    });
    const notes = await controller.findAll();
    expect(notes.length).toEqual(1);
  });

  it('should find a note', async () => {
    await controller.create({
      title: 'Test',
      content: 'Test',
    });
    const note = await controller.findOne('1');
    expect(note.id).toEqual(1);
    expect(note.title).toEqual('Test');
    expect(note.content).toEqual('Test');
  });

  it('should update a note', async () => {
    await controller.create({
      title: 'Test',
      content: 'Test',
    });

    const note = await controller.update('1', {
      title: 'Test 2',
      content: 'Test 2',
    });
    expect(note.id).toEqual(1);
    expect(note.title).toEqual('Test 2');
    expect(note.content).toEqual('Test 2');
  });

  it('should remove a note', async () => {
    await controller.create({
      title: 'Test',
      content: 'Test',
    });
    const before = await controller.findAll();
    expect(before.length).toEqual(1);
    await controller.remove('1');
    const after = await controller.findAll();
    expect(after.length).toEqual(0);
  });

  it('should throw error when note not found', async () => {
    try {
      await controller.findOne('1');
    } catch (error) {
      expect(error.message).toEqual('Note with id 1 not found');
    }
  });

  it('should throw error when note not found for update', async () => {
    try {
      await controller.update('1', {
        title: 'Test',
        content: 'Test',
      });
    } catch (error) {
      expect(error.message).toEqual('Note with id 1 not found');
    }
  });

  it('should throw error when note not found for remove', async () => {
    try {
      await controller.remove('1');
    } catch (error) {
      expect(error.message).toEqual('Note with id 1 not found');
    }
  });
});
