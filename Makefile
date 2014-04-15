TESTS=test/spec/*.js

all: node_modules prod

node_modules: package.json
	npm install
	touch node_modules

build: node_modules
	./node_modules/.bin/borschik -m no -i src/xblocks.js -o xblocks.js

prod: build
	./node_modules/.bin/borschik -i src/xblocks.js -o xblocks.min.js

test: node_modules
	./node_modules/.bin/mocha --reporter dot $(TESTS)
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .

.PHONY: all test
