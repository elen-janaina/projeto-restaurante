# Use uma imagem base do Node.js
FROM node:18

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o diretório src para o contêiner
COPY ./src ./
COPY ./public ./public

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
ENTRYPOINT [ "node", "app.js" ]