import { readHouses, calculateHeatLoss } from './lib/heatLoss';

const houses = readHouses('./data/houses.json');
houses.forEach((house) => {
  const houseId = house.submissionId;
  console.log(`House ${houseId}: Heat Loss = ${calculateHeatLoss(house).toFixed(2)} kWh`);
});
