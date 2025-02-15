define usage
Targets:
	help     Show this help message
	install  Install in DESTDIR (default: $(default_destdir))
endef

.PHONY: all help install

default_destdir := $(HOME)/Notes/.obsidian/plugins/$(notdir $(CURDIR))

DESTDIR ?= $(default_destdir)
src_files := manifest.json main.js styles.css
files := $(src_files:%=$(DESTDIR)/%)

all: main.js

help:
	$(info $(usage))
	@:

main.js: package.json esbuild.config.mjs $(wildcard src/*.ts)
	npm run build

install: $(files)

$(files): $(DESTDIR)/%: % | $(DESTDIR)
	cp $< $@

$(DESTDIR):
	mkdir -p $@
