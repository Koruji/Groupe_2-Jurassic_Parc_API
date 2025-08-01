up:
	docker-compose up --build

down:
	docker compose down

sh-api1:
	docker-compose exec api1 sh

sh-api2:
	docker-compose exec api2 sh

test-api1:
	docker compose exec api1 npm test

test-api2:
	docker compose exec api2 npm test

wait-mysql1:
	@echo "Waiting for mysql1..."
	@for i in {1..30}; do \
	  ID=$$(docker ps -qf "name=mysql1"); \
	  if [ -n "$$ID" ]; then \
	    docker exec $$ID mysqladmin ping -h localhost -u root -ppassword --silent && break; \
	  fi; \
	  echo "Retrying mysql1..."; \
	  sleep 2; \
	done

wait-mysql2:
	@echo "Waiting for mysql2..."
	@for i in {1..30}; do \
	  ID=$$(docker ps -qf "name=mysql2"); \
	  if [ -n "$$ID" ]; then \
	    docker exec $$ID mysqladmin ping -h localhost -u root -ppassword --silent && break; \
	  fi; \
	  echo "Retrying mysql2..."; \
	  sleep 2; \
	done

wait-databases: wait-mysql1 wait-mysql2
