## GENERAL ##
APP_DIR         = app
FILES_CONFIG    = ".env"
PASSWORD_FILE   = passwd
IMAGE_NODE		  = node:12-slim

ENV             ?= dev
STAGE           ?= ${ENV}
WORKDIR         ?= ${APP_DIR}

ifeq ($(ENV), prod)
NPM_FLAGS        = --production
endif

## FUNTIONS ##
define detect_user
	$(eval WHOAMI := $(shell whoami))
	$(eval USERID := $(shell id -u))
	$(shell echo 'USERNAME:x:USERID:USERID::/app:/sbin/nologin' > $(PWD)/$(PASSWORD_FILE).tmpl)
	$(shell \
		cat $(PWD)/$(PASSWORD_FILE).tmpl | sed 's/USERNAME/$(WHOAMI)/g' \
			| sed 's/USERID/$(USERID)/g' > $(PWD)/$(PASSWORD_FILE))
	$(shell rm -rf $(PWD)/$(PASSWORD_FILE).tmpl)
endef

npm.install: ## Instalar depedencias npm: make npm.install
	$(call detect_user)
	docker run \
		-it \
		--rm \
		--workdir /${WORKDIR} \
		-u ${USERID}:${USERID} \
		-v ${PWD}/$(PASSWORD_FILE):/etc/$(PASSWORD_FILE):ro \
		-v ${PWD}/${APP_DIR}:/${WORKDIR} \
		--tty=false \
		${IMAGE_NODE} \
		npm install ${NPM_FLAGS}
	rm -rf $(PWD)/$(PASSWORD_FILE)

logs: ## View logs docker containers, use me with: make logs
	export IMAGE_NODE="$(IMAGE_NODE)" && \
		docker-compose logs -f

start: ## Up the docker containers, use me with: make start
	export IMAGE_NODE="$(IMAGE_NODE)" && \
	export UID="$(shell id -u)" && \
	export GID="$(shell id -g)" && \
		docker-compose up -d

migration:
	$(call detect_user)
	docker run \
		-it \
		--rm \
		--workdir /${WORKDIR} \
		-u ${USERID}:${USERID} \
		-v ${PWD}/$(PASSWORD_FILE):/etc/$(PASSWORD_FILE):ro \
		--network lemts_default \
		-v ${PWD}/${APP_DIR}:/${WORKDIR} \
		${IMAGE_NODE} \
		npm run migration
	rm -rf $(PWD)/$(PASSWORD_FILE)

stop: ## Stop the docker containers, use me with: make stop
	export IMAGE_NODE="$(IMAGE_NODE)" && \
		docker-compose stop

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
