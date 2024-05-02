# Projeto Filmes

Este projeto foi desenvolvido utilizando a API do "The Movie DB" para a busca de filmes, o banco de dados Postgres para persistência dos dados, e uma arquitetura composta por um backend em Node.js com Express e um frontend em React.
A aplicação está utilizando containeres em Docker para facilitar o deploy.

Autenticação de Usuários: A aplicação possui uma tela de login/registro para que os usuários possam acessar o sistema.
Pesquisa de Filmes: Os usuários podem buscar por títulos de filmes utilizando a API do "The Movie DB".
Marcação de Filmes: Após encontrar um filme, os usuários podem marcá-lo como "Assistido" e/ou "Favorito", ou indicar que pretendem assisti-lo. Essas informações são persistidas no banco de dados Postgres.
Detalhes do Filme: Ao clicar na capa de um filme, os usuários podem visualizar informações básicas sobre ele, como nome, diretor, sinopse, duração e ano de lançamento.
Tela Inicial Personalizada: A página inicial dos usuários apresenta os títulos e capas dos filmes incluídos em suas listas de Assistidos, Favoritos, e aqueles que pretendem assistir.

Este projeto está dividido em três pastas distintas: Backend (Nodejs), Frontend em (React) e Docker (onde só tem o docker-compute para facilitar a subida da aplicação)


Inicializar o projeto:

  Com docker-compose:
    Navegue até o diretório ./Docker:
     ```docker-compose build´´´´ 
    Depois da construção das imagens serem realizadas sem erros:
      docker-compose up -d
    
