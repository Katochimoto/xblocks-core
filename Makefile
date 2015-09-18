NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

src_js := $(shell find src -type f -name "*.js")
polyfills_js := $(shell find src/polyfills -type f -name "*.js")

all: node_modules \
	bower_components \
	dist/xblocks-core.js \
	dist/x-tag-core.js

node_modules: package.json
	npm install
	touch node_modules

bower_components: bower.json
	bower install
	touch bower_components

clean:
	rm -rf dist

dist/xblocks-core.js: node_modules $(src_js)
	$(NPM_BIN)/webpack src/xblocks.js dist/xblocks-core.js
	$(NPM_BIN)/webpack src/xblocks.js dist/xblocks-core.min.js --optimize-minimize

dist/x-tag-core.js: src/xtag.js node_modules $(polyfills_js)
	$(NPM_BIN)/webpack src/xtag.js dist/x-tag-core.js --config webpack.config.xtag.js
	$(NPM_BIN)/webpack src/xtag.js dist/x-tag-core.min.js --optimize-minimize --config webpack.config.xtag.js

test: node_modules bower_components
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

testall: node_modules bower_components
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run

codeclimate: test
	CODECLIMATE_REPO_TOKEN=a410510f9164927ff329a119f9117c9a000878453a123228ec99bbdd852aa650 codeclimate < coverage/report/lcov.info

.PHONY: all test testall clean
