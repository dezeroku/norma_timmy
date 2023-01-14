help:
	@echo "make dev: start the development environment in docker" && \
	echo "make mock_api_stop: stop the mock_api (no check)"

dev:
	docker run -it -p 3000:3000 -v $$PWD:/dev_mount node:18.13.0 /bin/bash -c "cd /dev_mount; /bin/sh"

build:
	docker run --user $(shell id -u) -v $$PWD:/dev_mount node:18.13.0 /bin/bash -c "cd /dev_mount; npm install && npm run build"

.PHONY: build
