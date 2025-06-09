FROM node:22-alpine

WORKDIR /var/app

# Устанавливаем зависимости
COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
