# imagem que será usada no container
FROM node:lts-alpine

# área de trabalho dentro do container
WORKDIR /usr/app

# Faz a cópia para dentro do container possibilitando que ele saiba quais pacotes devem ser baixados
COPY package.json ./

# Inicia a intalação das dependências

# Agora faz a cópia de todo o conteúdo do projeto para a pasta raiz do container.
COPY . .

RUN npm install

# Define a porta que vai rodar no container
EXPOSE 3000

# Executa o comando para subir o server conforme parametrizado no projeto(ts-node-dev)
CMD [ "npm", "run", "dev" ]