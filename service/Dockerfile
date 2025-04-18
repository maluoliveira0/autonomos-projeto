# Use imagem oficial do Node
FROM node:20

# Cria diretório da aplicação
WORKDIR /app

# Copia arquivos package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o restante do código
COPY . .

# Gera client Prisma e compila a aplicação
RUN npx prisma generate
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]