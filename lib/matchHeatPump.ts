import fs from 'fs';
import path from 'path';

interface HeatPumpPackage {
  label: string;
  outputCapacity: number;
  costs: { label: string; cost: number }[];
}

export function findMatchingPackage(powerHeatLoss: number, heatPumpsFile = './data/heat-pumps.json'): HeatPumpPackage | null {
  const absPath = path.resolve(heatPumpsFile);
  const data = fs.readFileSync(absPath, 'utf-8');
  const packages: HeatPumpPackage[] = JSON.parse(data);
  // Find all packages with outputCapacity > powerHeatLoss
  const suitable = packages.filter(pkg => pkg.outputCapacity > powerHeatLoss);
  if (suitable.length === 0) return null;
  // Find the one with the smallest outputCapacity above the requirement
  suitable.sort((a, b) => a.outputCapacity - b.outputCapacity);
  return suitable[0];
}

export function getTotalCost(pkg: HeatPumpPackage, vatRate = 0.2): number {
  const subtotal = pkg.costs.reduce((sum, item) => sum + item.cost, 0);
  return subtotal * (1 + vatRate);
}
