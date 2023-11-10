import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameService } from './name/name.service';
import { NameModule } from './name/name.module';

@Module({
  imports: [NameModule],
  controllers: [AppController],
  providers: [AppService, NameService],
})
export class AppModule {}
