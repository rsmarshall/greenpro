# Node.js 22 Base Application with Docker

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

