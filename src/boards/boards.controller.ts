import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from '@prisma/client';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }
  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }
  @Get('/:id')
  getBoardId(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Patch('/:id')
  updateBoardById(
    @Param('id') id: number,
    @Body() createBoardDTO: CreateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.updateBoardById(id, createBoardDTO);
  }
  @Delete('/:id')
  deleteBoardById(@Param('id') id: number): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }
}
