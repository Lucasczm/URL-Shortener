import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../src/config/configuration';
import { Encurtador } from '../src/encurtador/encurtador.entity';
import { EncurtadorService } from '../src/encurtador/encutador.service';
import { EncurtadorModule } from '../src/encurtador/encurtador.module';

describe('Encurtador Controller (e2e)', () => {
  let app: INestApplication;
  let service: EncurtadorService;
  let repository: Repository<Encurtador>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EncurtadorModule,
        ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
        TypeOrmModule.forRootAsync({
          useFactory: function (config: ConfigService): TypeOrmModuleOptions {
            const options = {
              ...config.get('database'),
              ...config.get('database_test'),
            };
            return options;
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Encurtador]),
      ],
      providers: [
        EncurtadorService,
        { provide: getRepositoryToken(Encurtador), useClass: Encurtador },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<EncurtadorService>(EncurtadorService);
    repository = moduleFixture.get(getRepositoryToken(Encurtador));
    await repository.manager.connection.synchronize(true);
    await app.init();
  });

  afterAll((done) => {
    done();
  });

  it('/encurtador -> short url', () => {
    return request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: 'http://wisereducacao.com/' })
      .expect(201)
      .expect((res) => {
        expect(res.body.newUrl).toBeDefined();
      });
  });

  it('/encurtador -> mal formated url', () => {
    return request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: 'is not url' })
      .expect(400);
  });

  it('/:code -> invalid URL', () => {
    return request(app.getHttpServer()).get('/invalidcoide').expect(404);
  });

  it('/:code -> redirect to URL', async () => {
    const encurtador = new Encurtador();
    encurtador.code = '1234abc';
    encurtador.url = 'http://wisereducacao.com/';
    await service.save(encurtador);
    return request(app.getHttpServer())
      .get('/1234abc')
      .expect(HttpStatus.PERMANENT_REDIRECT)
      .expect((res) => expect(res.headers.location).toEqual(encurtador.url));
  });
});
