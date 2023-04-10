install:
	npm ci

publish:
	npm publish --dry-run

run:
	bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .