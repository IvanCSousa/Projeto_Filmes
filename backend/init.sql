-- Criação da tabela dos usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
);

-- Criação da tabela dos filmes já assistidos
CREATE TABLE assistidos (
    id SERIAL PRIMARY KEY,
    filme VARCHAR(100),
    usuario_id INT,
    UNIQUE (filme, usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criação da tabela dos filmes favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    filme VARCHAR(100),
    usuario_id INT,
    UNIQUE (filme, usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- Criação da tabela dos filmes assistir_depois
CREATE TABLE assistir_depois (
    id SERIAL PRIMARY KEY,
    filme VARCHAR(100),
    usuario_id INT,
    UNIQUE (filme, usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserindo teste na tabela de usuarios
INSERT INTO usuarios (nome, email, senha) VALUES ('Ivan Sousa', 'ivan@vivo.com.br', 'senha123');