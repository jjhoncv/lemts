# ## GENERAL ##
IMAGE_SERVER       = node-server:12-slim
APP_DIR_SERVER	   = $(APP_DIR)/server

build.image.server:
	docker build \
		-f docker/dev/node/Dockerfile \
		--no-cache \
		--build-arg IMAGE=${IMAGE_NODE} \
		-t $(IMAGE_SERVER) \
		docker/dev/node/

permissions.server:
	$(eval WHOAMI := $(shell whoami))
	sudo chown ${WHOAMI}:${WHOAMI} docker/dev/mysql/data

npm.install.server: ## Instalar depedencias npm: make npm.install
	$(call detect_user)
	docker run \
		-it \
		--rm \
		-u ${USERID}:${USERID} \
		-v ${PWD}/$(PASSWORD_FILE):/etc/$(PASSWORD_FILE):ro \
		-v ${PWD}/${APP_DIR_SERVER}:/${WORKDIR} \
		--tty=false \
		${IMAGE_SERVER} \
		npm install ${NPM_FLAGS}
	rm -rf $(PWD)/$(PASSWORD_FILE)

logs.server: ## View logs docker containers, use me with: make logs
	export IMAGE_NODE="$(IMAGE_SERVER)" && \
		docker-compose -f docker-compose-server.yml logs -f

start.server: ## Up the docker containers, use me with: make start
	export IMAGE_NODE="$(IMAGE_SERVER)" && \
	export UID="$(shell id -u)" && \
	export GID="$(shell id -g)" && \
		docker-compose -f docker-compose-server.yml up -d

stop.server: ## Stop the docker containers, use me with: make stop
	export IMAGE_NODE="$(IMAGE_DEV)" && \
		docker-compose -f docker-compose-server.yml stop
