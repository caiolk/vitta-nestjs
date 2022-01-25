# Indice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Dependências](#dependências)
- [Instalando o docker](#instalando-o-docker)
- [Como baixar o projeto](#como-baixar-o-projeto)
- [Rodando ambiente com Docker](#rodando-ambiente-com-docker)
- [Endpoints](#endpoints)
- [Solicitando tokens de acesso [/auth]](#solicitando-tokens-de-acesso-auth)
- [Customers [/customers]](#customers-customers)
- [Novo Customer[POST]](#novo-customerpost)
- [Detalhar [GET /customers/:id]](#detalhar-get-customersid)
- [Atualizar [PATCH /customers/:id]](#atualizar-patch-customersid)

## Sobre

O projeto **Vita Nestjs** é uma api criada à fins de teste de criação de "Customers" além de gerar tokens através do servidor de autenticação da Vitta.

---

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [NestJS](https://nestjs.com)
- [Redis](https://redis.io)
- [Axios](https://github.com/axios/axios)
- [Docker](https://www.docker.com)

---

## Dependências

```bash

    - Docker
    - WSL (para ambientes Windows)
```

## Instalando o Docker

O **Docker** pode ser baixado através do [https://www.docker.com](https://www.docker.com). Caso esteja utilizando ambiente Windows, é necessário instalar o WSL (Windows Subsystem for Linux) através do [link](https://docs.microsoft.com/pt-br/windows/wsl/install).

---

## Como baixar o projeto

```bash

    # Clonar o repositório
    $ git clone https://github.com/caiolk/vitta-nestjs

    # Entrar no diretório
    $ cd vitta-nestjs

```
## Rodando ambiente com Docker

Acesse o diretório em que o repositório foi clonado através do terminal e
execute os comandos:
 - `docker-compose build` para compilar imagens, criar containers etc.
 - `docker-compose up` para inicializar os contâiners.

** Observação: Certifique que no repositório contenha os arquivos `Dockerfile` e `docker-compose.yml`
---


### Endpoints

## Solicitando tokens de acesso [/auth]

### Utilizando o código de acesso [POST]

| Parâmetro | Descrição |
|---|---|
| `grant_type` | Informar: `authorization_code` |
| `client_id` | Código de identificação da aplicação no sistema. |
| `client_secret` | `client_secret` da aplicação no sistema. |
| `username` | `username` da aplicação no sistema. |
| `password` | `password` da aplicação no sistema. |
| `scope` | Código recebido pela autorização do usuário. |

+ Request (application/x-www-form-urlencoded)

    + Body

            {
                "grant_type": "client_credentials",
                "client_id": "e70654d7f568d0",
                "client_secret": "156762a28c007a64ff",
                "username" : "usuario@usuario.com",
                "password" : "123456",
                "scope" : "openid"
            }

+ Response 200 (application/json)

    + Body

            {
                "access_token": "[access_token]",
                "token_type": "Bearer",
                "expires_in": 300,
                "refresh_expires_in": 0,
                "token_type": "[token_type]",
                "id_token" : "[id_token]",
                "not-before-policy" : 0,
                "scope" : "[scope]"

            }

# Customers [/customers]

### Novo Customer[POST]

+ Attributes (object)

    + name: nome do customer (string, required)
    + document: CPF/CNPJ do customer (string, required)

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Bearer [access_token]

    + Body

            {
              "name": "Customer 1",
              "document": "Document 1",
            }

+ Response 200 (application/json)

    + Body

            {
                "status": true,
                "message": "Customer salvo com sucesso.",
                "customerData": {
                    "id": "7fab907d-1829-4f94-b585-a8bd5e6616a8",
                    "name": "Customer 1",
                    "document": "Document 1" 
                }
            }

### Detalhar [GET /customers/:id]

+ Parameters
    + id (required, string) ... id do contato (formato UUID V4)
  
+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Bearer [access_token]

+ Response 200 (application/json)
  Todos os dados do customer
    + Body

            {
                "id": "a88d17ef-f472-4e10-9836-50790e28a6aa",
                "name": "Customer 1",
                "document": "Document 1"
            }

+ Response 404 (application/json)
  Quando o registro não for encontrado no sistema.
    + Headers

            X-RateLimit-Limit: 60
            X-RateLimit-Remaining: 59

    + Body

            {
              "statusCode": 404,
              "message": "Customer não encontrado",
              "error": "Not Found"
            }

### Atualizar [PATCH /customers/:id]

+ Request (application/x-www-form-urlencoded)

  + Headers

            Authorization: Bearer [access_token]

  + Parameters
      + id (required, string) ... id do contato (formato UUID V4)
  + Body

            {
              "name": "Customer 1",
              "document": "Document 1",
            }
+ Response 200 (application/json)

    + Body

            {
              "name": "Customer 1",
              "document": "Document 1",
            }

+ Response 404 (application/json)
  Quando o registro não for encontrado no sistema.

    + Body

            {
              "statusCode": 404,
              "message": "Customer não encontrado",
              "error": "Not Found"
            }

Desenvolvido por Caio Kozano.