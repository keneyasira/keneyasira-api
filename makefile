#AWS_REGION ?= eu-west-1
GIT_SHA := $(shell git rev-parse --short=7 HEAD)
export GIT_SHA

ifeq ($(NODE_ENV), production)
  NODE_PROC := node
else
  NODE_PROC := npx ts-node -r tsconfig-paths/register
endif

.PHONY: test

## Thanks to Marmelab for the `help` command: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show help on commands
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

install: ## Install necessary packages to run the application
	@npm ci

run: ## Start nest server in watch mode
	@npm run start:dev

debug: ## Start nest server in watch and debug mode
	@npm run start:debug

lint: ## Check that our coding style is respected using ESLint
	@npm run lint

type-check: ## Check that our code can be transpiled by typescript
	@npm run type-check

test: ## Run test suite. You can filter out using `make test TEST_NAME=<pattern>`
	@npm run build
	@$(MAKE) regenerate-db-test
	@npm run test $(TEST_NAME)

create-db:
	-@$(NODE_PROC) ./bin/database/handle-database create

drop-db:
	@$(NODE_PROC) ./bin/database/handle-database drop

create-model: ## Generate a new Sequelize model with a NAME (required). Example: `make create-model NAME=candidate`
ifdef NAME
	@npx nest generate class ${NAME}
else
	@echo 'You need to set a NAME to generate a model. Example: `make create-model NAME=candidate/models/candidate.model`'
endif

create-seeder: ## Generate a new Sequelize seeder with a NAME (required). Example: `make create-seeder NAME=candidate`
ifdef NAME
	@npx sequelize seed:create --name $(NAME)
else
	@echo 'You need to set a NAME to generate a seeder. Example: `make create-seeder NAME=candidate`'
endif

create-migration: ## Generate a new Sequelize migration with a NAME (required). Example: `make create-migration NAME=add-phone-number-column-to-candidates`
ifdef NAME
	@npx sequelize migration:create --name $(NAME)
else
	@echo 'You need to set a NAME to generate a migration. Example: `make create-migration NAME=add-phone-number-column-to-candidates`'
endif

migrate: ## Execute migrations
	@$(NODE_PROC) ./bin/database/handle-migrations RUN

undo-last-migration: ## Undo the last migration
	@$(NODE_PROC) ./bin/database/handle-migrations REVERT_ONE

seed-db: ## Undo all seeders, then execute seeders
	@$(MAKE) db-seeds-down
	@$(MAKE) db-seeds-up

db-seeds-down: ## Undo all seeders
	@$(NODE_PROC) ./bin/database/handle-seeders DOWN

db-seeds-up: ## Execute seeders
	@$(NODE_PROC) ./bin/database/handle-seeders UP

regenerate-db: ## Delete and regenerate the Database and the schema
	@-make drop-db
	@-make create-db
	@make migrate
	@make seed-db


regenerate-db-test: ## Delete and recreate the Database and the schema
	@-NODE_ENV=test make drop-db
	@-NODE_ENV=test make create-db
	@NODE_ENV=test make migrate
	@NODE_ENV=test make seed-db

# aws-ecr-login:
# 	@eval `aws ecr get-login --no-include-email --region ${AWS_REGION}`

# build-image: aws-ecr-login
build-image:
	docker build -t keneyasira-api:${GIT_SHA} .
# 	docker tag keneyasira-api:${GIT_SHA} 447534819717.dkr.ecr.eu-west-1.amazonaws.com/keneyasira-api:${GIT_SHA}
# 	docker tag keneyasira-api:${GIT_SHA} 447534819717.dkr.ecr.eu-west-1.amazonaws.com/misterprofession-v2:latest
# 	docker push 447534819717.dkr.ecr.eu-west-1.amazonaws.com/keneyasira-api:${GIT_SHA}
# 	docker push 447534819717.dkr.ecr.eu-west-1.amazonaws.com/keneyasira-api:latest
