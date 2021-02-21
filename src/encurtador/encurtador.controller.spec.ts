import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EncurtadorController } from './encurtador.controller';
import { EncurtadorService } from './encutador.service';

describe('EncurtadorController', () => {
  let controller: EncurtadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EncurtadorService, useFactory: jest.fn(() => ({})) },
        { provide: ConfigService, useFactory: jest.fn(() => ({})) },
      ],
      controllers: [EncurtadorController],
    }).compile();

    controller = module.get<EncurtadorController>(EncurtadorController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
