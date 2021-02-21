import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Encurtador } from './encurtador.entity';

@Injectable()
export class EncurtadorService {
  constructor(
    @InjectRepository(Encurtador)
    private encurtadorRepository: Repository<Encurtador>,
  ) {}
  checkUrl = function (url: string): boolean {
    const regexp = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
  };

  expired = function (created_at: Date, expiration: number): boolean {
    let diff = (new Date().getTime() - created_at.getTime()) / 1000;
    diff /= 60;
    return diff > expiration;
  };

  encode = function (): string {
    const str: string = Math.random()
      .toString(36)
      .substr(2, Math.random() * (10 - 5) + 5);
    return str;
  };

  save(encurtador: Encurtador): Promise<Encurtador> {
    return this.encurtadorRepository.save(encurtador);
  }

  findOne(code: string): Promise<Encurtador> {
    return this.encurtadorRepository.findOne({ code });
  }

  async remove(id: number): Promise<void> {
    await this.encurtadorRepository.delete(id);
  }
}
