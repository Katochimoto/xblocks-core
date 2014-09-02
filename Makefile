all: node_modules \
    bower_components \
    xblocks-core.js \
    xblocks-core.min.js \
    xblocks-core-full.js \
    xblocks-core-full.min.js \
    x-tag-core.js \
    x-tag-core.min.js

node_modules: package.json
	npm install
	touch node_modules

bower_components: bower.json
	bower install
	touch bower_components

clean:
	rm -f xblocks-core.js
	rm -f xblocks-core.min.js
	rm -f xblocks-core-full.js
	rm -f xblocks-core-full.min.js
	rm -f x-tag-core.js
	rm -f x-tag-core.min.js

xblocks-core.js: node_modules src/*.js
	cat node_modules/setimmediate/setImmediate.js > xblocks-core.js
	./node_modules/.bin/borschik -m no -i src/xblocks.js >> xblocks-core.js

xblocks-core.min.js: xblocks-core.js
	./node_modules/.bin/borschik -i xblocks-core.js -o xblocks-core.min.js

xblocks-core-full.js: node_modules src/*.js
	cat node_modules/setimmediate/setImmediate.js > xblocks-core-full.js
	./node_modules/.bin/borschik -m no -i src/xtag.js >> xblocks-core-full.js
	./node_modules/.bin/borschik -m no -i src/xblocks.js >> xblocks-core-full.js

xblocks-core-full.min.js: xblocks-core-full.js
	./node_modules/.bin/borschik -i xblocks-core-full.js -o xblocks-core-full.min.js

x-tag-core.js: node_modules src/xtag.js
	./node_modules/.bin/borschik -m no -i src/xtag.js > x-tag-core.js

x-tag-core.min.js: x-tag-core.js
	./node_modules/.bin/borschik -i x-tag-core.js -o x-tag-core.min.js

test: node_modules bower_components
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

.PHONY: all test clean
