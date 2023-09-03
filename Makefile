CONTAINER = bonus-register-admin

up-f:
	docker-compose up --build --no-recreate -d
up:
	docker-compose up -d
stop:
	docker-compose stop
run:
	docker exec -it admin-vue sh -c "npm i && npm run dev"
build:
	docker exec -it admin-vue sh -c "npm run build"
p:
	docker exec -it admin-vue sh -c "chmod -R 757 src"
	chmod -R 757 ./vue-app/src