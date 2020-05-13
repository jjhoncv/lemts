APP_DIR         = app
PASSWORD_FILE   = passwd

ENV             ?= dev
STAGE           ?= ${ENV}
WORKDIR         ?= ${APP_DIR}
IMAGE_NODE		= node:12-slim

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

