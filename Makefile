NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

src_js := $(shell find src -type f -name "*.js")
polyfills_js := $(shell find src/polyfills -type f -name "*.js")
src_jsx := $(shell find test src -type f -name "*.jsx")
src_jsx_js := $(addsuffix .js, $(src_jsx))

all: node_modules \
	bower_components \
	dist/xblocks-core.js \
	dist/xblocks-core.min.js \
	dist/xblocks-core-full.js \
	dist/xblocks-core-full.min.js \
	dist/x-tag-core.js \
	dist/x-tag-core.min.js \
	$(src_jsx_js)


node_modules: package.json
	npm install
	touch node_modules

bower_components: bower.json
	bower install
	touch bower_components

clean:
	rm -f dist/xblocks-core.js
	rm -f dist/xblocks-core.min.js
	rm -f dist/xblocks-core-full.js
	rm -f dist/xblocks-core-full.min.js
	rm -f dist/x-tag-core.js
	rm -f dist/x-tag-core.min.js
	find test src -type f -name "*.jsx.js" -exec rm -f {} \;

$(src_jsx_js): %.jsx.js: %.jsx node_modules
	$(NPM_BIN)/babel $< -o $@

dist/xblocks-core.js: node_modules $(src_jsx_js) $(src_js)
	cat node_modules/setimmediate2/setImmediate.js > $@
	$(NPM_BIN)/borschik -m no -i src/xblocks.js >> $@

dist/xblocks-core.min.js: dist/xblocks-core.js
	$(NPM_BIN)/borschik -i $< -o $@

dist/xblocks-core-full.js: node_modules $(src_jsx_js) $(src_js)
	cat node_modules/setimmediate2/setImmediate.js > $@
	$(NPM_BIN)/borschik -m no -i src/xtag.js >> $@
	$(NPM_BIN)/borschik -m no -i src/xblocks.js >> $@

dist/xblocks-core-full.min.js: dist/xblocks-core-full.js
	$(NPM_BIN)/borschik -i $< -o $@

dist/x-tag-core.js: src/xtag.js node_modules $(polyfills_js)
	$(NPM_BIN)/borschik -m no -i $< > $@

dist/x-tag-core.min.js: dist/x-tag-core.js
	$(NPM_BIN)/borschik -i $< -o $@

test: node_modules bower_components
	$(NPM_BIN)/jshint .
	$(NPM_BIN)/jscs .
	./node_modules/karma/bin/karma start --single-run --browsers PhantomJS

testall: node_modules bower_components
	$(NPM_BIN)/jshint .
	$(NPM_BIN)/jscs .
	./node_modules/karma/bin/karma start --single-run

codeclimate: test
	CODECLIMATE_REPO_TOKEN=a410510f9164927ff329a119f9117c9a000878453a123228ec99bbdd852aa650 codeclimate < coverage/report/lcov.info

.PHONY: all test testall clean
