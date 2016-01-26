NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

src_js := $(shell find src -type f -name "*.js")

all: node_modules \
	prod

node_modules: package.json
	npm install
	touch node_modules

clean:
	rm -rf dist
	rm -rf samples/dist

prod: node_modules $(src_js) webpack.config.js
	NODE_ENV=production ./node_modules/.bin/webpack --progress

dev: node_modules $(src_js) webpack.config.js
	NODE_ENV=development ./node_modules/.bin/webpack --progress --watch

test: node_modules
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

testall: node_modules
	$(NPM_BIN)/eslint .
	./node_modules/karma/bin/karma start --single-run

codeclimate: test
	CODECLIMATE_REPO_TOKEN=a410510f9164927ff329a119f9117c9a000878453a123228ec99bbdd852aa650 codeclimate < coverage/report/lcov.info

.PHONY: all test testall clean
