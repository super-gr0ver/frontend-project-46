install:
	npm ci

publish:
	npm publish --dry-run

run:
	bin/gendiff.js

test:
	npm test

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .