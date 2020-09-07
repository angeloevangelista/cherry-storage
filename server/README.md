# <p align="center">Cherry Storage: Backend</p>

# Rotas da aplicação

<br>

## **Users**

### **`POST` - /users**

**Objetivo**: A rota deve ser capaz de criar um usuário e persistir no banco de dados.

**Formato**: A rota deve receber `name`, `surname`, `email` e `password` dentro do corpo da requisição.

**Retorno**: Se bem sucedida, a rota retornará uma resposta do formato abaixo.

```json
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "id": "uuid",
  "created_at": "Date",
  "updated_at": "Date"
}
```

**Nota**: Não é possível a definição de um 'avatar' durante a criação.

### **`PATCH` - /users/avatar**

**Objetivo**: A rota deve ser capaz de atualizar o avatar do usuário autênticado.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token` e, também, um arquivo de imagem válido no corpo da requisição, com o nome `avatar`.

**Retorno**: Se atualizado com sucesso, a rota retornará o objeto atualizado no seguinte formato

```json
{
  "id": "uuid",
  "name": "string",
  "surname": "string",
  "email": "string",
  "created_at": "Date",
  "updated_at": "Date",
  "avatar": "string | null",
  "avatar_url": "string | null"
}
```

## **Sessions**

### **`POST` - /sessions**

**Objetivo**: A rota deve ser capaz de autenticar o usuário e entregar um token(JWT) com validade de 1 dia.

**Formato**: A rota deve receber `email` e `password` no corpo da requisição.

**Retorno**: Se autenticado com sucesso, a rota retornará os dados do usuário e o token de acesso do usuário:

```json
{
  "user": {
    "id": "uuid",
    "name": "string",
    "surname": "string",
    "email": "string",
    "avatar": "string | null",
    "avatar_url": "string | null"
  },
  "token": "JWT token"
}
```

<br>

## **Files**

### **`POST` - /files/**

**Objetivo**: A rota deve ser capaz de realizar o upload de um arquivo.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token` e um arquivo no corpo da requisição com o nome `file`.

**Retorno**: A rota retornará um objeto com as informações do arquivo salvo no seguinte formato:

```json
{
  "name": "string",
  "mime_type": "string",
  "original_filename": "string",
  "user_id": "uuid",
  "id": "uuid",
  "created_at": "Date",
  "updated_at": "Date",
  "url": "string"
}
```

### **`GET` - /files**

**Objetivo**: A rota deve ser capaz de listar todos os arquivos armazenados que pertencem ao usuário autênticado.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token`.

**Retorno**: A rota retornará um array de arquivos do seguinte formato:

```json
[
  {
    "id": "uuid",
    "name": "string",
    "mime_type": "string",
    "original_filename": "string",
    "user_id": "uuid",
    "created_at": "Date",
    "updated_at": "Date"
  },
  ...
]
```

### **`GET` - /files/file_id**

**Objetivo**: A rota deve ser capaz de entregar os dados de um arquivos específico.

**Formato**: A rota deve receber `file_id` nos parâmetros da requisição no formato `uuid`.

**Retorno**: A rota retornará um objeto no seguinte formato:

```json
{
  "id": "uuid",
  "name": "string",
  "mime_type": "string",
  "original_filename": "string",
  "user_id": "uuid",
  "created_at": "Date",
  "updated_at": "Date",
  "url": "string"
}
```

### **`PUT` - /files/file_id**

**Objetivo**: A rota deve ser capaz de atualizar um arquivo armazenado.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token` e um arquivo no corpo da requisição com o nome `file` e `file_id` nos parâmetros da requisição no formato `uuid`.

**Retorno**: A rota retornará um objeto com as informações do arquivo atualizado no seguinte formato:

```json
{
  "name": "string",
  "mime_type": "string",
  "original_filename": "string",
  "user_id": "uuid",
  "id": "uuid",
  "created_at": "Date",
  "updated_at": "Date",
  "url": "string"
}
```

### **`DELETE` - /files/file_id**

**Objetivo**: A rota deve ser capaz de excluir um arquivo armazenado.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token` e um arquivo no corpo da requisição com o nome `file` e `file_id` nos parâmetros da requisição no formato `uuid`.

**Retorno**: A rota não possue retorno, apenas retornará o `status code 204`, se bem sucedida.

<br>

## **BETA**

**Atenção**: Estas rotas não serão usadas por enquanto, porque não tenho certeza se serão úteis.

### **`GET` - /storafe/file_id**

**Objetivo**: A rota deve ser capaz de entregar um arquivo armazenado.

**Formato**: A rota deve receber `authorization` dentro do cabeçalho da requisição no formato `Bearer token`.

**Retorno**: A rota retorna o arquivo físico requisitado.
<br>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE), na raiz do projeto, para mais detalhes.
