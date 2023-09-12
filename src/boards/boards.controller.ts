import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board } from '@prisma/client';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  createBoard(@Body() data: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(data);
  }
  @Get()
  async getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }
  @Get('/:id')
  async getBoardId(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Patch('/:id')
  async updateBoardById(
    @Param('id') id: number,
    @Body() data: CreateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.updateBoardById(id, data);
  }
  @Delete('/:id')
  async deleteBoardById(@Param('id') id: number) {
    return this.boardsService.deleteBoardById(id);
  }
}
