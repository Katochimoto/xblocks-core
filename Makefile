all: node_modules bower_components prod

node_modules: package.json
	npm install
	touch node_modules

bower_components: bower.json
	bower install
	touch bower_components

build: node_modules
	./node_modules/.bin/borschik -m no -i src/xblocks.js -o xblocks-core.js

prod: build
	./node_modules/.bin/borschik -i src/xblocks.js -o xblocks-core.min.js

test: node_modules bower_components
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

.PHONY: all test
