# Evergreen tech test application for Greenpro

This is currently a base node 22 application under development for the Greenpro test test

Developement steps/thoughts

Base application in place
Converted to TypeScript
Basic docker setup
Reading of house data implemented
Heat loss calculator in place currently in index

## Requirements
- [Docker](https://www.docker.com/get-started)
- (Optional) [Node.js 22](https://nodejs.org/) for local development

## Usage

### Run Locally
```sh
npm install
npm start
```

### Run with Docker
```sh
docker build -t node22-app .
docker run --rm node22-app
```

### Run with Docker Compose
```sh
docker-compose up --build
```

