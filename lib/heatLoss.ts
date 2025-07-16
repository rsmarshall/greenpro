import fs from 'fs';
import path from 'path';
import { getDegreeDays } from './weather';

export interface House {
  submissionId: string;
  floorArea: number;
  heatingFactor: number;
  insulationFactor: number;
  designRegion?: string;
}

export function readHouses(filePath: string): House[] {
  const absPath = path.resolve(filePath);
  const data = fs.readFileSync(absPath, 'utf-8');
  return JSON.parse(data) as House[];
}

export function calculateHeatLoss(house: House): number {
  return house.floorArea * house.heatingFactor * house.insulationFactor;
}

export async function calculatePowerHeatLoss(house: House): Promise<number> {
  const heatLoss = calculateHeatLoss(house);
  if (!house.designRegion) {
    throw new Error('House is missing designRegion for degree days lookup');
  }
  const degreeDays = await getDegreeDays(house.designRegion);
  if (!degreeDays) {
    throw new Error('Warning: Could not find design region');
  }
  return heatLoss / degreeDays;
}
