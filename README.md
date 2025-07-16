# Evergreen tech test application for Greenpro

Greenpro tech test to select and output heatpump reccomendation with costings, based on a houses heat loss.

The following link contains the brief

https://github.com/EvergreenEnergy/evergreen-earth-tech-exercise/blob/main/README.md

## Requirements
- [Docker](https://www.docker.com/get-started)
- (Optional) [Node.js 22](https://nodejs.org/) for local development (nvm.rc added)

## Usage

### Run Locally
```sh
npm install
npm run build
npm start
```

### Run with Docker Compose
```sh
docker compose up --build
```

### Tests
```sh
npm test
```

### Developement steps/thoughts

- Base application in place
- Converted to TypeScript
- Basic docker setup
- Reading of house data implemented
- Heat loss calculator in place currently in index
- Added weather api file in lib and a getDegreeDays function for what we need in this app
- Added heatpump matching lib file and total cost calculator function
- Hooked in heatpump matching to output
- Could use some tidying probably, time limited here

