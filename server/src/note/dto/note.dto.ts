import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MaxLength(20)
  title: string;

  @IsString()
  @MinLength(20)
  @MaxLength(300)
  content: string;
}
