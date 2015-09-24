NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

src_js := $(shell find src -type f -name "*.js")

all: node_modules \
	bower_components \
	lodash \
	dist \
	dist/xblocks-core-full.js \
	dist/xblocks-core-full.min.js

node_modules: package.json
	npm install
	touch node_modules

bower_components: bower.json
	bower install
	touch bower_components

clean:
	rm -rf dist
	rm -rf lodash

lodash: node_modules Makefile
	$(NPM_BIN)/lodash exports=umd include=assign,merge,isPlainObject,clone,cloneDeep,uniqueId,isNative,keys modularize -o $@
	touch lodash

dist: node_modules lodash $(src_js) webpack.config.js
	$(NPM_BIN)/webpack
	touch dist

dist/xblocks-core-full.js: dist
	cat dist/x-tag-core.js > $@
	echo "\n\n" >> $@
	cat dist/xblocks-core.js >> $@

dist/xblocks-core-full.min.js: dist
	cat dist/x-tag-core.min.js > $@
	echo "\n\n" >> $@
	cat dist/xblocks-core.min.js >> $@

test: node_modules bower_components lodash
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

testall: node_modules bower_components lodash
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run

codeclimate: test
	CODECLIMATE_REPO_TOKEN=a410510f9164927ff329a119f9117c9a000878453a123228ec99bbdd852aa650 codeclimate < coverage/report/lcov.info

.PHONY: all test testall clean
