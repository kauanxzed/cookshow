import { Module } from '@nestjs/common';
import { SharedUtilService } from './shared-util.service';
import { SharedUtilServiceImpl } from './shared-util.service.impl';

@Module({
  controllers: [],
  providers: [{ provide: SharedUtilService, useClass: SharedUtilServiceImpl }],
  exports: [SharedUtilService],
})
export class SharedUtilModule {}
