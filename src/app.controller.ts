import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return `<h1>Go to <a href="/api">'/api'</a> to see the documentation. Thanks for consuming me!</h1>`;
  }
}
