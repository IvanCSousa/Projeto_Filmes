# Projeto Filmes

Este projeto foi desenvolvido utilizando a API do "The Movie DB" para a busca de filmes, o banco de dados Postgres para persistência dos dados, e uma arquitetura composta por um backend em Node.js com Express e um frontend em React.
A aplicação está utilizando containeres em Docker para facilitar o deploy.

**Tarefas da aplicação**

Autenticação de Usuários: A aplicação possui uma tela de login/registro para que os usuários possam acessar o sistema.

Pesquisa de Filmes: Os usuários podem buscar por títulos de filmes utilizando a API do "The Movie DB".

Marcação de Filmes: Após encontrar um filme, os usuários podem marcá-lo como "Assistido" e/ou "Favorito", ou indicar que pretendem assisti-lo. Essas informações são persistidas no banco de dados Postgres.

Detalhes do Filme: Ao clicar na capa de um filme, os usuários podem visualizar informações básicas sobre ele, como nome, diretor, sinopse, duração e ano de lançamento.

Tela Inicial Personalizada: A página inicial dos usuários apresenta os títulos e capas dos filmes incluídos em suas listas de Assistidos, Favoritos, e aqueles que pretendem assistir.

Este projeto está dividido em três pastas distintas: Backend (Nodejs), Frontend em (React) e Docker (onde só tem o docker-compute para facilitar a subida da aplicação).

## DEPLOY

### 1.  **renomear os arquivos para .env**

1. Renomei os arquivos env nos diretórios frontend e backend:
    ```bash
    mv ./frontend/env ./frontend/.env
    mv ./backend/env ./backend/.env


### 2. Deploy Com docker-compose

1. Em seguida, execute o comando para construir as imagens ou navegue até a pasta docker:
    ```bash
    docker-compose -f ./docker/docker-compose.yaml build
    ```
    

3. Depois que a construção das imagens for concluída sem erros, você pode iniciar os contêineres em segundo plano (caso queira ver os logs de build é só retirar o -d):
    ```bash
    docker-compose -f ./docker/docker-compose.yaml up -d
    ```
    
4. Para parar o projeto, isso irá parar e remover os contêineres e rede criados pelo `docker-compose`, execute:
    ```bash
   docker-compose -f ./docker/docker-compose.yaml down
    ```
    


## 3. Deploy com o Docker Utilizando Dockerfile

1. Criação da Rede Docker

Execute o seguinte comando para criar a rede Docker necessária para conectar os contêineres:

```bash
docker network create app_network
```


2. Banco de Dados PostgreSQL
Construa e execute o contêiner para o banco de dados e associando-o à rede criada anteriormente:
```bash
docker build -t imagem_pg -f ./backend/DockerfilePG ./backend
docker run -d --name db -p 5432:5432 --network=app_network imagem_pg
```

3. Backend Node.js
Construa e execute o contêiner para o backend associando-o à mesma rede e especificando a dependência do banco de dados:
```bash
docker build -t imagem_bd -f ./backend/DockerfileBE ./backend
docker run -d --name backend_container -p 3000:3000 --network=app_network imagem_bd
```

4. Frontend React
Construa e execute o contêiner para o frontend React, associando-o à mesma rede:

```bash
docker build -t image_front -f ./frontend/DockerfileNode ./frontend
docker run -d --name frontend_container -p 5173:5173 --network=app_network image_front
```



**Importante**
Nos diretórios ./frontend e ./backend 
existem dois arquivos env, onde estão as variáveis de ambiente, importante **renomear os arquivos para .env** 
