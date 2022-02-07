import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  getIndex() {
    return 'Hello world';
  }
}
