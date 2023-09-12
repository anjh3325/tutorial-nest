import { IsEnum, IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class CreateBoardDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(BoardStatus)
  status: BoardStatus;
}
