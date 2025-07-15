import { readHouses, calculateHeatLoss } from './lib/heatLoss';

const houses = readHouses('./data/houses.json');
houses.forEach((house) => {
  // Use submissionId if available, otherwise fallback to id
  const houseId = house.submissionId || house.id;
  console.log(`House ${houseId}: Heat Loss = ${calculateHeatLoss(house).toFixed(2)} kWh`);
});
