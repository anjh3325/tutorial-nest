import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private prismaServie: PrismaService) {}

  // 게시글 생성
  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return await this.prismaServie.board.create({
      data: createBoardDTO,
    });
  }

  // 전체 게시글 불러오기
  async getAllBoard(): Promise<Board[]> {
    return await this.prismaServie.board.findMany();
  }

  // 특정 게시글 불러오기
  async getBoardById(id: number): Promise<Board> {
    const found = await this.prismaServie.board.findUnique({
      where: { id: Number(id) },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // 특정 게시글 수정
  async updateBoardById(
    id: number,
    createBoardDTO: CreateBoardDTO,
  ): Promise<Board> {
    this.getBoardById(id);

    return await this.prismaServie.board.update({
      where: { id: Number(id) },
      data: createBoardDTO,
    });
  }

  // 특정 게시글 삭제
  async deleteBoardById(id: number): Promise<void> {
    this.getBoardById(id);

    await this.prismaServie.board.delete({
      where: { id: Number(id) },
    });
  }
}
