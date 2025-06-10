up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose up -d --build

toapp:
	docker exec -it mock-backend sh

logs:
	docker logs mock-backend -f

restart:
	docker compose restart

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
