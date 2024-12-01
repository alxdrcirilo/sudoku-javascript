.PHONY: install update clean build help

install: ## Install dependencies
	bun install

update: ## Update dependencies
	bun update

clean: ## Clean up the project
	rm -rf node_modules dist

build: install ## Build project
	rm -rf dist
	bun run esbuild src/main.js --bundle > build.js
	mkdir dist
	mv -f build.js dist/.

dev: build ## Run project in development mode
	bun run dev

run: build ## Run project in production mode
	bun run start

deploy: build ## Deploy project to GitHub Pages
	cp -rf assets dist/.
	cp index.html dist/.
	cp styles.css dist/.
	sed -i '' 's|dist/build.js|build.js|g' dist/index.html
	gh-pages -d dist --cname alxdrcirilo.dev

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'
