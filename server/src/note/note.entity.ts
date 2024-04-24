import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', length: 20 })
  title: string;

  @Column({ name: 'content', length: 300 })
  content: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;
}
