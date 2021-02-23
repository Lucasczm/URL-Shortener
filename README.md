<h1 align="center">
    <img alt="Wiser" src=".github/logo.png" width="350px" />
</h1>

<p align="center">
<b>Encurtador de URL</b><br/>
Desafio técnico proposto no processo de seleção Wiser
</p>

<p align="center">
  <a href="#sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
  <a href="#iniciando">Iniciando</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;&#149;&nbsp;&nbsp;&nbsp;
  <a href="#documentação">Documentação e API</a>
</p>

## Sobre o projeto

Este projeto é uma API desenvolvida em [Nest.JS](https://nestjs.com) que tem como finalidade encurtar URL na qual é passada como parâmetro.

### Estruras de pastas

```bash
├── src                        # Contém código fonte do projeto
│   ├── config                 # Configurações do ambiente
│   │   └── configuration.ts
│   ├── encurtador
│   │   ├── encurtador.controller.spec.ts # Teste do controller
│   │   ├── encurtador.controller.ts      # Controller
│   │   ├── encurtador.entity.ts          # Entidade
│   │   ├── encurtador.module.ts          # Modulo
│   │   ├── encurtador.service.spec.ts    # Serviço do bd
│   │   └── encurtador.service.ts         # Teste do serviço
│   ├── migrations            # Contém as migrations para o bd
│   │   └──1613924429134-EncurtadorTable.ts
│   ├── app.module.ts
│   ├── main.ts
├── test                      # Testes e2e
│   ├── encurtador.e2e-spec
│   └── jest-e2e.json
...
├── docker-compose.yml        # Definição para o ambiente Docker
├── Dockerfile                # Definição para a o container
....
├── Procfile                  # Configuração para o Heroku
...
```

O algoritmo de geração de URL funciona da seguinte forma:

- Gera um número aleatório entre 0 e 1 (randomNumber)
- Converte o número para string usando base 36 (convertedString)
- Gera um número aleatório entre 5 e 10 (randomLength)
- Recorta _convertedString_ partir do índice 2 até o tamanho do número aleatório gerado anteriormente _randomLength_ criando a string final da URL (code)

```typescript
const randomNumber = Math.random(); //saída aleatória: 0.5158657944210119
const convertedString = randomNumber.toString(36); //saída: "0.ikk8fx1irz"
const randomLength = Math.random() * (10 - 5) + 5; //saída: 7
const code = convertedString.substr(2, randomLength); //saída: ikk8fx1
```

## Funcionalidades

- Encurta URL
- Gera uma URL 5 a 10 caracteres.
- Salva URL no banco de dados
- Expira URL após um tempo definido
- Exclui a URL expirada quando consultada

## Iniciando

### Docker

Este projeto já esta configurado para uso com docker.

```bash
$ docker-compose up -d
```

Ao executar o comando, será dado build na aplicação, executado testes e por fim subirá o ambiente de produção da aplicação junto com o servidor [Postgres](https://www.postgresql.org/) e [pgAdmin](https://www.pgadmin.org/)

### Local

:exclamation: Para executar este projeto em um ambiente local, você precisa ter um servidor postgres já configurado.

Execute o comando para instalar as dependências

```bash
$ npm install
```

Copie o .env.example para .env

```bash
$ cp .env.example .env
```

Modifique as variaveis do arquivo .env, de acordo com o seu ambiente

```bash
PORT=3000                           #Porta da aplicação
SERVER_HOST='http://localhost:3000' #URL da aplicação
TYPEORM_CONNECTION=postgres     #Tipo de conexão do banco de dados
TYPEORM_HOST=localhost              #Endereço do banco de dados
TYPEORM_PORT=5432                   #Porta do banco de dados
TYPEORM_USERNAME=postgres           #Usuario do bando de dados
TYPEORM_PASSWORD=password1234!      #Senha do banco de dados
TYPEORM_DATABASE=urlshortener       #Tabela do banco de dados
EXPIRATION_MINUTES=2        #Tempo de expiração da senha em minutos
```

Execute os testes unitários e e2e

```bash
$ npm run test
$ npm run test:e2e
```

Inicie o projeto

```bash
$ npm start
```

## Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

- [Typescript](https://www.typescriptlang.org/)
- [Node.JS](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [TypeORM](https://typeorm.io/)
- [Heroku](https://heroku.com/)

## Documentação

Você pode acessar a documentação e a API <a href="https://url-shortener-wiser.herokuapp.com/api" target="_blank">aqui.</a>
