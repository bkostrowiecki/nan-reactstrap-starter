import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import nextConfig from '../../../next.config';

@Injectable()
export class ViewService implements OnModuleInit {
  private readonly logger = new Logger(ViewService.name);

  private server: NextServer & any;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
        conf: nextConfig as any,
      });
      await this.server.prepare();
    } catch (error) {
      this.logger.error(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
