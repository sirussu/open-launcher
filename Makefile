install:
	yarn install
lint:
	npx eslint .
test:
	yarn test
test-coverage:
	npm test -- --coverage
build:
	rm -rf dist_electron
	yarn run electron:build
start:
	yarn electron:serve