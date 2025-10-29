# 🐲 API Pokédex — Guia de Uso

Uma API RESTful para gerenciar uma Pokédex, construída com NestJS, TypeORM e PostgreSQL. Este documento explica como instalar, configurar, rodar e testar a aplicação localmente, além de descrever os endpoints disponíveis e fornecer exemplos práticos.

---

## Sumário
- Visão geral
- Funcionalidades
- Tecnologias
- Requisitos
- Instalação rápida
- Configuração (.env)
- Rodando a aplicação
- Documentação Swagger
- Endpoints (com exemplos)
- Observações de design e produção
- Testes e desenvolvimento
- Resolução de problemas comuns
- Contribuição
- Licença

---

## Visão geral
A API permite criar, ler, atualizar e deletar registros de Pokémon com validação detalhada (DTOs + class-validator). Ela inclui enums para tipagem (Region, PokemonType, Generation, Nature) e usa TypeORM como ORM para persistência em PostgreSQL.

---

## Funcionalidades principais
- CRUD completo para Pokémon
- Validação de entrada com DTOs (class-validator)
- Tipagem rica com enums TypeScript
- Documentação interativa via Swagger
- Tratamento consistente de erros (HttpException do NestJS)

---

## Tecnologias
- Node.js + TypeScript
- NestJS
- TypeORM
- PostgreSQL
- Swagger (@nestjs/swagger)
- class-validator / class-transformer
- (Opcional) Docker

---

## Requisitos
- Node.js v18+
- npm ou pnpm
- PostgreSQL (local ou Docker)
- (Opcional) Docker

---

## Instalação rápida

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/pokemon-api.git
cd pokemon-api
```

2. Instale dependências:
```bash
npm install
# ou
pnpm install
```

---

## Configuração (.env)

Crie um arquivo `.env` na raiz baseado no exemplo abaixo:

```env
# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_segura
DB_NAME=pokedex_db

# Porta da aplicação
PORT=3000

# (Opcional) Ambiente
NODE_ENV=development
```

Exemplo de `docker run` para subir um container PostgreSQL:
```bash
docker run --name pokedex-db -e POSTGRES_PASSWORD=sua_senha_segura -e POSTGRES_DB=pokedex_db -p 5432:5432 -d postgres
```

---

## Rodando a aplicação

Modo desenvolvimento (com hot-reload):
```bash
npm run start:dev
# ou
pnpm run start:dev
```

A aplicação estará disponível por padrão em:
```
http://localhost:3000
```

---

## Documentação Swagger

Assim que a aplicação estiver rodando, a documentação Swagger estará disponível em:
```
http://localhost:3000/api
```
Use essa interface para inspecionar DTOs, testar endpoints e ver os esquemas de resposta.

---

## Endpoints principais

Observação: a API usa `:name` para operações de busca e remoção e `:id` (UUID) para atualização conforme o design original.

- POST /pokemon
  - Cria um novo Pokémon.
  - Status: 201 Created
  - Exemplo (curl):
  ```bash
  curl -X POST "http://localhost:3000/pokemon" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Bulbasaur",
      "nationalDex": 1,
      "region": "Kanto",
      "type": ["Grass", "Poison"],
      "generation": "Generation I",
      "nature": "Modest",
      "height": 0.7,
      "weight": 6.9,
      "image": "https://img.pokemondb.net/artwork/bulbasaur.jpg",
      "abilities": "Overgrow",
      "stats": {
        "attack": 49,
        "defense": 49,
        "HP": 45,
        "SpecialAttack": 65,
        "SpecialDefense": 65,
        "Speed": 45
      },
      "ev": 64
    }'
  ```

- GET /pokemon
  - Lista todos os Pokémons.
  - Status: 200 OK
  - Retorna `[]` se não houver registros.

- GET /pokemon/:name
  - Busca um Pokémon pelo nome.
  - Status: 200 OK ou 404 Not Found se não encontrado.
  - Exemplo:
  ```bash
  curl "http://localhost:3000/pokemon/Bulbasaur"
  ```

- PATCH /pokemon/:id
  - Atualiza o campo `nationalDex` de um Pokémon (busca por id).
  - Status: 200 OK (após atualização) ou 404 Not Found.
  - Exemplo:
  ```bash
  curl -X PATCH "http://localhost:3000/pokemon/a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8" \
    -H "Content-Type: application/json" \
    -d '{"nationalDex": 2}'
  ```

- DELETE /pokemon/:name
  - Deleta um Pokémon pelo nome.
  - Status: 200 OK (ou 204) ou 404 Not Found se não existir.
  - Exemplo:
  ```bash
  curl -X DELETE "http://localhost:3000/pokemon/Bulbasaur"
  ```

---

## Estrutura de dados (exemplo resumido)
Exemplo de resposta ao criar um Pokémon (201):
```json
{
  "id": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  "nationaldex": 1,
  "name": "Bulbasaur",
  "region": "Kanto",
  "type": ["Grass", "Poison"],
  "generation": "Generation I",
  "nature": "Modest",
  "height": 0.7,
  "weight": 6.9,
  "image": "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  "abilities": "Overgrow",
  "stats": {
    "attack": 49,
    "defense": 49,
    "HP": 45,
    "SpecialAttack": 65,
    "SpecialDefense": 65,
    "Speed": 45
  },
  "ev": 64,
  "createdAt": "2025-10-29T12:00:00.000Z",
  "updateAt": "2025-10-29T12:00:00.000Z"
}
```

---

## Notas de design e recomendações para produção

- IDs: Preferir UUIDs (ids) para GET/UPDATE/DELETE em produção; nomes podem mudar e não são únicos garantidos.
- synchronize: true (TypeORM) é útil em desenvolvimento, mas não recomendado em produção — use migrações.
- Conexão ao banco: configure pool de conexões e variáveis de tempo limite.
- Segurança:
  - Habilite CORS conforme necessário.
  - Considere autenticação (JWT) e autorização de rotas para operações sensíveis.
  - Valide e sanitize imagens/URLs antes de armazenar.
- Logs e monitoramento: adicione um logger estruturado (p.ex. Winston) e integre com métricas/monitoramento.

---

## Testes & Desenvolvimento
- Adicione testes unitários para services e controllers (Jest).
- Para desenvolvimento local, insira seeds simples ou um script para popular alguns Pokémons.
- Sugestão: criar comandos npm para rodar migrations e seeds.

Exemplo de scripts no package.json sugeridos:
```json
{
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "migration:generate": "ts-node ./node_modules/typeorm/cli.js migration:generate -n",
    "migration:run": "ts-node ./node_modules/typeorm/cli.js migration:run",
    "test": "jest"
  }
}
```

---

## Resolução de problemas comuns

- Erro de conexão com Postgres:
  - Verifique `.env` (host, porta, usuário, senha, db).
  - Se estiver usando Docker, confirme se o container está rodando e porta 5432 está exposta.
- Entidades não sincronizadas:
  - Confirme `synchronize` no TypeORM (apenas dev); para produção use migrations.
- Erros de validação:
  - Revise DTOs e mensagens retornadas (class-validator fornece detalhes).
- Swagger não aparece:
  - Verifique se o caminho `/api` está configurado em `main.ts` e se a aplicação iniciou sem erros.

---

## Contribuição
Contribuições são bem-vindas! Recomenda-se:
1. Fork do repositório
2. Criar branch com feature/fix
3. Abrir Pull Request descrevendo as mudanças
4. Incluir testes quando aplicável

---

## Recursos adicionais
- NestJS Docs: https://docs.nestjs.com
- TypeORM Docs: https://typeorm.io
- PostgreSQL: https://www.postgresql.org
- Swagger/OpenAPI: https://swagger.io

---

## Licença
Inclua a licença desejada (MIT, Apache-2.0, etc.) no arquivo `LICENSE` do repositório.

---
