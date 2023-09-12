import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDTO);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO,
  ): Promise<String> {
    return this.authService.signIn(authCredentialDTO);
  }
}
