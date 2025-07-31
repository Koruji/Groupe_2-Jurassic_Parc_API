up:
	docker-compose up --build

down:
	docker-compose down

sh-api1:
	docker-compose exec api1 sh

sh-api2:
	docker-compose exec api2 sh

test-api1:
	docker-compose exec api1 npm test

test-api2:
	docker-compose exec api2 npm test
