import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Encurtador } from './encurtador.entity';
import { EncurtadorService } from './encutador.service';

describe('EncurtadorService', () => {
  let service: EncurtadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncurtadorService,
        {
          provide: getRepositoryToken(Encurtador),
          useFactory: jest.fn(() => ({})),
        },
      ],
    }).compile();

    service = module.get<EncurtadorService>(EncurtadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be invalid url', () => {
    expect(service.checkUrl('is not a url')).toBeFalsy();
  });

  it('should be valid url', () => {
    expect(service.checkUrl('http://wisereducacao.com')).toBeTruthy();
    expect(service.checkUrl('https://wisereducacao.com')).toBeTruthy();
  });

  it('should encode url between 5 and 10 character', () => {
    const encodedLength = service.encode().length;
    expect(encodedLength).toBeLessThanOrEqual(10);
    expect(encodedLength).toBeGreaterThanOrEqual(5);
  });

  it('should be not expired url', () => {
    expect(service.expired(new Date(), 2)).toBeFalsy();
  });

  it('should be a expired url', () => {
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 2.5);
    const expired = service.expired(startDate, 2);
    expect(expired).toBeTruthy();
  });
});
