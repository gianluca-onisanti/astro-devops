# Imagem base com Node.js
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /astro-devops

# Copia apenas o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Copia o restante do projeto
COPY . .

# Define o proprietário dos arquivos para o usuário 'node'
RUN npm ci

# Executa o build do projeto
RUN npm run build

# Expõe a porta em que o aplicativo será executado
EXPOSE 4321

# Comando para iniciar o aplicativo em modo de visualização
CMD ["npm", "run", "preview"]