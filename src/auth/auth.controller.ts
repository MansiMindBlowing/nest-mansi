import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    // return 'I am signed up';
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.pass);
  }
}