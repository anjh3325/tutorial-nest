import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { ConflictException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prismaServie: PrismaService) {}

  async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialDTO.password, salt);
    authCredentialDTO.password = hashedPassword;
    try {
      await this.prismaServie.user.create({ data: authCredentialDTO });
    } catch (error) {
      throw new ConflictException('Existing username');
    }
  }
  async signIn(authCredentialDTO: AuthCredentialDTO): Promise<string> {
    const user = await this.prismaServie.user.findUnique({
      where: { username: authCredentialDTO.username },
    });

    if (
      user &&
      (await bcrypt.compare(authCredentialDTO.password, user.password))
    ) {
      return 'logIn success';
    } else {
      return 'logIn fail';
    }
  }
}
