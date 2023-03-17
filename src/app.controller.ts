import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async geProductList() {
    const data = await this.appService.productList({
      prodName: 'test1',
    });
    if (data) {
      return JSON.stringify(data);
    }
    return 'test';
  }

  @Get('manyList')
  async getTest2() {
    const data = await this.appService.syncGetList();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${used} MB`);
    if (data) {
      return JSON.stringify(data);
    }

    return 'test2';
  }
}
