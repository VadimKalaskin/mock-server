#!/bin/sh

echo "⏳ Ждём базу данных..."
# Ждём, пока база данных будет доступна (до 60 сек)
until nc -zv mock-db 5432 2>/dev/null; do
  sleep 1
done

echo "✅ База данных доступна, продолжаем."

echo "⏳ Ждём backend (mock-backend:4200)..."
# Ждём, пока backend вернёт 'OK' на /health
until curl -s http://mock-backend:4200/health | grep "OK" > /dev/null; do
  echo "⌛ Backend ещё не готов, ждём..."
  sleep 2
done

echo "✅ Backend доступен, продолжаем."

# Билдим Next.js только когда база готова
npm run build

# Запуск
npm run start
