import { findMatchingPackage, getTotalCost } from './matchHeatPump';
import fs from 'fs';
import path from 'path';

describe('findMatchingPackage', () => {
  const testFile = path.join(__dirname, '../data/heat-pumps.json');
  const packages = JSON.parse(fs.readFileSync(testFile, 'utf-8'));

  it('finds the correct package for a power heat loss just below a package', () => {
    const match = findMatchingPackage(7.9, testFile);
    expect(match).not.toBeNull();
    expect(match?.outputCapacity).toBe(8);
  });

  it('finds the correct package for a power heat loss just above a package', () => {
    const match = findMatchingPackage(8.1, testFile);
    expect(match).not.toBeNull();
    expect(match?.outputCapacity).toBe(12);
  });

  it('returns null if no package is large enough', () => {
    const match = findMatchingPackage(20, testFile);
    expect(match).toBeNull();
  });
});

describe('getTotalCost', () => {
  const testFile = path.join(__dirname, '../data/heat-pumps.json');
  const packages = JSON.parse(fs.readFileSync(testFile, 'utf-8'));

  it('calculates the total cost of a package including VAT', () => {
    const pkg = packages[0];
    const subtotal = pkg.costs.reduce((sum: number, item: any) => sum + item.cost, 0);
    const expected = subtotal * 1.2;
    const total = getTotalCost(pkg);
    expect(total).toBeCloseTo(expected, 2);
  });

  it('calculates the total cost of a package with custom VAT', () => {
    const pkg = packages[0];
    const subtotal = pkg.costs.reduce((sum: number, item: any) => sum + item.cost, 0);
    const expected = subtotal * 1.05;
    const total = getTotalCost(pkg, 0.05);
    expect(total).toBeCloseTo(expected, 2);
  });
});
