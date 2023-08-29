import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/is_public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // http://127.0.0.1:3000/
  @Public()
  @Get()
  getHello(): string {
    // users -> mysql
    // select().from(User).limit(10).where()
    return 'Hello World!';
  }

  // http://127.0.0.1:3000/user
  @Public()
  @Post('/user')
  setUser(@Body() user: { user: string }) {
    console.log(user);
    return user;
  }
}
