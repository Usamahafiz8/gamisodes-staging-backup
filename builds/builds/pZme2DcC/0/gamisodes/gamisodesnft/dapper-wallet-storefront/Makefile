.PHONY: run-local
run-local: ## Run local DB
	docker compose -f docker/local/docker-compose.yml up -d

.PHONY: build-staging
build-staging: ## Build the staging docker image.
	docker compose -f docker/staging/docker-compose.yml build

.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker compose -f docker/staging/docker-compose.yml up -d

.PHONY: stop-staging
stop-staging: ## Stop the staging docker container.
	docker compose -f docker/staging/docker-compose.yml down
  
.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-preprod
start-staging: ## Start the preprod docker container.
	docker compose -f docker/preprod/docker-compose.yml up -d

.PHONY: stop-preprod
stop-staging: ## Stop the preprod docker container.
	docker compose -f docker/preprod/docker-compose.yml down
  
.PHONY: build-preprod
build-production: ## Build the production docker image.
	docker compose -f docker/preprod/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down