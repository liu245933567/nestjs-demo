// import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

const IS_DEV = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT || 3000;

const PREFIX = process.env.PREFIX || '';

async function bootstrap() {
  // const logger: Logger = new Logger('main.ts');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // 开启日志级别打印
    logger: false
    // logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn']
  });

  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);

  app.useLogger(app.get(Logger));

  await app.listen(PORT, () => {
    // logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${PREFIX}`);
  });
}

bootstrap();
