import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    ApiModule,
    ViewModule, // needs to be last always
  ],
  providers: [AppService],
})
export class AppModule {}
