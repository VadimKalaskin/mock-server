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