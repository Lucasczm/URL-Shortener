import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncurtadorService } from './encutador.service';
import { EncurtadorController } from './encurtador.controller';
import { Encurtador } from './encurtador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Encurtador])],
  providers: [EncurtadorService],
  controllers: [EncurtadorController],
  exports: [TypeOrmModule],
})
export class EncurtadorModule {}
