define usage
Targets:
	help     Show this help message
	install  Symlink the plugin into Obsidian vault
endef

repo_path := $(shell pwd)

.PHONY: all help install

all: main.js

help:
	$(info $(usage))
	@:

install: | main.js
ifeq (,$(OBSIDIAN_VAULT))
	$(error OBSIDIAN_VAULT is not set)
else
	ln -sf $(repo_path) "$(OBSIDIAN_VAULT)/.obsidian/plugins/"
endif

main.js: package.json esbuild.config.mjs $(wildcard src/*.ts)
	npm run build
