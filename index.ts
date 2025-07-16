import 'dotenv/config';
import { readHouses, calculateHeatLoss, calculatePowerHeatLoss } from './lib/heatLoss';
import { findMatchingPackage, getTotalCost } from './lib/matchHeatPump';

const houses = readHouses('./data/houses.json');

(async () => {
  for (const house of houses) {
    console.log('--------------------------------------');
    console.log(house.submissionId);
    console.log('--------------------------------------');
    const estimatedHeatLoss = calculateHeatLoss(house).toFixed(2);
    console.log(`  Estimated Heat Loss = ${estimatedHeatLoss} kWh`);
    try {
      const powerHeatLoss = await calculatePowerHeatLoss(house);
      console.log(`  Design Region = ${house.designRegion}`);
      console.log(`  Power Heat Loss = ${powerHeatLoss.toFixed(2)} kW`);
      const match = findMatchingPackage(powerHeatLoss);
      if (match) {
        console.log('  Cost Breakdown');
        match.costs.forEach(item => {
          console.log(`    ${item.label}, £${item.cost}`);
        });
        console.log(`  Total Cost, including VAT = £${getTotalCost(match)}`);
      }
    } catch (err) {
      if ((err as Error).message.includes('design region')) {
        console.log('  Warning: Could not find design region');
      } else {
        console.log(`  Warning: ${(err as Error).message}`);
      }
      console.log();
      continue;
    }
    console.log();
  }
})();
