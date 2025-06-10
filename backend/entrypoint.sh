#!/bin/sh

echo "⏳ Ждём базу данных (mock-db:5432)..."

until nc -zv mock-db 5432 2>/dev/null; do
  echo "⌛ Ждём PostgreSQL..."
  sleep 2
done

echo "✅ База данных доступна, продолжаем"

# Генерация Prisma клиента
npx prisma db push
npx prisma generate

# Сборка NestJS
npm run build

# Меняем MTU интерфейса eth0
ip link set eth0 mtu 1400

# Проверяем
echo "🔹 Current MTU: $(cat /sys/class/net/eth0/mtu)"

echo "🚀 Запуск backend"
node dist/main
