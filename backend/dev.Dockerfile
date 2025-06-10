FROM node:22-alpine

WORKDIR /var/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Для удобства можно указать NODE_ENV
ENV NODE_ENV=development

EXPOSE 4200

# Запуск с хот релоадом
CMD ["npm", "run", "start:dev"]