import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Encurtador, ResposeEncurtador } from './encurtador.entity';
import { EncurtadorService } from './encutador.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class EncurtadorController {
  constructor(
    private service: EncurtadorService,
    private config: ConfigService,
  ) {}

  @Post('/encurtador')
  @ApiTags('encurtador')
  @ApiOperation({ summary: 'Encurta a url que é enviada no body' })
  @ApiResponse({ status: 400, description: 'URL Mal formatada' })
  @ApiResponse({
    status: 201,
    description: 'URL criada com sucesso',
    type: ResposeEncurtador,
  })
  async encurtador(@Body() urlEntity: Encurtador): Promise<ResposeEncurtador> {
    if (!urlEntity.url) {
      throw new BadRequestException('Campo url é obrigatório');
    }
    if (!this.service.checkUrl(urlEntity.url)) {
      throw new BadRequestException(
        'Campo url precisa ser valido e começar com http:// ou https://',
      );
    }
    const url = this.service.encode();
    const encurtado = new Encurtador();
    encurtado.code = url;
    encurtado.url = urlEntity.url;
    await this.service.save(encurtado);
    return {
      newUrl: `${this.config.get('server')}/${url}`,
    };
  }

  @Get(':code')
  @ApiTags('/')
  @ApiResponse({
    status: HttpStatus.PERMANENT_REDIRECT,
    description: 'Redireciona para URL original',
  })
  @ApiResponse({ status: 404, description: 'URL não encontrada' })
  async redirectUrl(
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.service.findOne(code);
    if (!!data) {
      if (
        !this.service.expired(data.created_at, this.config.get('expiration'))
      ) {
        return res.redirect(HttpStatus.PERMANENT_REDIRECT, data.url);
      }
      await this.service.remove(data.id);
    }
    throw new NotFoundException();
  }
}
