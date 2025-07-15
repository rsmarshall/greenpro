import fs from 'fs';
import path from 'path';

export interface House {
  submissionId: string;
  floorArea: number;
  heatingFactor: number;
  insulationFactor: number;
}

export function readHouses(filePath: string): House[] {
  const absPath = path.resolve(filePath);
  const data = fs.readFileSync(absPath, 'utf-8');
  return JSON.parse(data) as House[];
}

export function calculateHeatLoss(house: House): number {
  return house.floorArea * house.heatingFactor * house.insulationFactor;
}
