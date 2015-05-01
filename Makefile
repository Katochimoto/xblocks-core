src_js := $(shell find src -type f -name "*.js")
polyfills_js := $(shell find src/polyfills -type f -name "*.js")
src_jsx := $(shell find test src -type f -name "*.jsx")
src_jsx_js := $(addsuffix .js, $(src_jsx))

all: node_modules \
    bower_components \
    xblocks-core.js \
    xblocks-core.min.js \
    xblocks-core-full.js \
    xblocks-core-full.min.js \
    x-tag-core.js \
    x-tag-core.min.js \
	$(src_jsx_js)


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
	find src -type f -name "*.jsx.js" -exec rm -f {} \;

$(src_jsx_js): %.jsx.js: %.jsx node_modules
	./node_modules/.bin/jsx --no-cache-dir --strip-types --harmony $< > $@

xblocks-core.js: node_modules $(src_jsx_js) $(src_js)
	cat node_modules/setimmediate2/setImmediate.js > $@
	./node_modules/.bin/borschik -m no -i src/xblocks.js >> $@

xblocks-core.min.js: xblocks-core.js
	./node_modules/.bin/borschik -i $< -o $@

xblocks-core-full.js: node_modules $(src_jsx_js) $(src_js)
	cat node_modules/setimmediate2/setImmediate.js > $@
	./node_modules/.bin/borschik -m no -i src/xtag.js >> $@
	./node_modules/.bin/borschik -m no -i src/xblocks.js >> $@

xblocks-core-full.min.js: xblocks-core-full.js
	./node_modules/.bin/borschik -i $< -o $@

x-tag-core.js: src/xtag.js node_modules $(polyfills_js)
	./node_modules/.bin/borschik -m no -i $< > $@

x-tag-core.min.js: x-tag-core.js
	./node_modules/.bin/borschik -i $< -o $@

test: node_modules bower_components
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

testall: node_modules bower_components
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .
	./node_modules/karma/bin/karma start --single-run

codeclimate: test
	CODECLIMATE_REPO_TOKEN=a410510f9164927ff329a119f9117c9a000878453a123228ec99bbdd852aa650 codeclimate < coverage/report/lcov.info

.PHONY: all test testall clean
