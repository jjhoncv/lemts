.DEFAULT_GOAL := help

include makefiles/base.mk
include makefiles/client.mk
include makefiles/server.mk



# ## GENERAL ##
# APP_DIR         = app
# FILES_CONFIG    = .env
# PASSWORD_FILE   = passwd
# IMAGE_NODE		= node:12-slim
# IMAGE_DEV       = node-server:12-slim

# ENV             ?= dev
# STAGE           ?= ${ENV}
# WORKDIR         ?= ${APP_DIR}

# ifeq ($(ENV), prod)
# NPM_FLAGS        = --production
# endif

build.image:
	@make build.image.server

npm.install:
	@make npm.install.server

start:
	@make start.server

stop:
	@make stop.server

logs:
	@make logs.server

	# docker build \
	# 	-f docker/dev/node/Dockerfile \
	# 	--no-cache \
	# 	--build-arg IMAGE=${IMAGE_NODE} \
	# 	-t $(IMAGE_DEV) \
	# 	docker/dev/node/ \

# permissions:
# 	$(eval WHOAMI := $(shell whoami))
# 	sudo chown ${WHOAMI}:${WHOAMI} docker/dev/mysql/data

# npm.install: ## Instalar depedencias npm: make npm.install
# 	$(call detect_user)
# 	docker run \
# 		-it \
# 		--rm \
# 		--workdir /${WORKDIR} \
# 		-u ${USERID}:${USERID} \
# 		-v ${PWD}/$(PASSWORD_FILE):/etc/$(PASSWORD_FILE):ro \
# 		-v ${PWD}/${APP_DIR}:/${WORKDIR} \
# 		--tty=false \
# 		${IMAGE_DEV} \
# 		npm install ${NPM_FLAGS}
# 	rm -rf $(PWD)/$(PASSWORD_FILE)

# logs: ## View logs docker containers, use me with: make logs
# 	export IMAGE_NODE="$(IMAGE_DEV)" && \
# 		docker-compose logs -f

# start: ## Up the docker containers, use me with: make start
# 	export IMAGE_NODE="$(IMAGE_DEV)" && \
# 	export UID="$(shell id -u)" && \
# 	export GID="$(shell id -g)" && \
# 		docker-compose up -d

# stop: ## Stop the docker containers, use me with: make stop
# 	export IMAGE_NODE="$(IMAGE_DEV)" && \
# 		docker-compose stop

## Target Help ##

help:
	@printf "\033[31m%-22s %-59s %s\033[0m\n" "Target" " Help" "Usage"; \
	printf "\033[31m%-22s %-59s %s\033[0m\n"  "------" " ----" "-----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-22s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
