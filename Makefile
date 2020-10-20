install:
	yarn install
lint:
	npx eslint .
test:
	yarn test:unit
	yarn test:e2e
unit:
	yarn test:unit
test-coverage:
	npm test:unit -- --coverage
build:
	rm -rf dist_electron
	yarn run electron:build
start:
	yarn electron:serve
story:
	yarn storybook