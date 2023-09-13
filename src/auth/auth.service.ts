import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialDTO.password, salt);
    authCredentialDTO.password = hashedPassword;
    try {
      await this.prismaService.user.create({ data: authCredentialDTO });
    } catch (error) {
      throw new ConflictException('Existing username');
    }
  }
  async signIn(
    authCredentialDTO: AuthCredentialDTO,
  ): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { username: authCredentialDTO.username },
    });

    if (
      user &&
      (await bcrypt.compare(authCredentialDTO.password, user.password))
    ) {
      const payload = { username: user.username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
