FROM node:22-alpine

# Установка зависимостей
RUN apk add --no-cache \
    curl \
    ca-certificates \
    openssl \
    tzdata \
    iproute2

# Обновление CA-сертификатов
RUN update-ca-certificates

# Рабочая директория
WORKDIR /var/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Открываем порт
EXPOSE 4200

# Переменная окружения для принудительного использования TLS 1.2
ENV NODE_OPTIONS=--tls-min-v1.2

# Запуск приложения
CMD ["node", "dist/main"]