# ## GENERAL ##
IMAGE_DEV       = node-client:12-slim

build.image.client:
	docker build \
		-f docker/dev/node/Dockerfile \
		--no-cache \
		--build-arg IMAGE=${IMAGE_NODE} \
		-t $(IMAGE_DEV) \
		docker/dev/node/ \