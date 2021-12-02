import { IsNotEmpty } from 'class-validator';
// https://github.com/typestack/class-validator#validation-decorators
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
