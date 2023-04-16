install:
	npm ci

publish:
	npm publish --dry-run

run:
	bin/gendiff.js

test:
	npm test

test-coverage:
	npx jest --coverage

lint:
	npx eslint .