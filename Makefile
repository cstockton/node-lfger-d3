check: test

test: test-unit test-acceptance

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha

test-acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha --bail test/acceptance/*.js

.PHONY: test test-unit test-acceptance clean
