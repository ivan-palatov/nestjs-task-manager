import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(2, 100)
  title: string;

  @IsNotEmpty()
  description: string;
}
