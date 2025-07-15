import { calculateHeatLoss, readHouses, House } from './heatLoss';
import fs from 'fs';
import path from 'path';

describe('calculateHeatLoss', () => {
  it('calculates heat loss correctly for valid input', () => {
    const house: House = {
      submissionId: 'test-house',
      floorArea: 100,
      heatingFactor: 2,
      insulationFactor: 1.5,
    };
    expect(calculateHeatLoss(house)).toBe(300);
  });

  it('returns 0 if any factor is 0', () => {
    const house: House = {
      submissionId: 'test-house',
      floorArea: 0,
      heatingFactor: 2,
      insulationFactor: 1.5,
    };
    expect(calculateHeatLoss(house)).toBe(0);
  });
});

describe('readHouses', () => {
  const testFile = path.join(__dirname, '../data/houses.json');

  it('reads and parses houses.json correctly', () => {
    const houses = readHouses(testFile);
    expect(Array.isArray(houses)).toBe(true);
    expect(houses[0]).toHaveProperty('floorArea');
    expect(houses[0]).toHaveProperty('heatingFactor');
    expect(houses[0]).toHaveProperty('insulationFactor');
    expect(houses[0]).toHaveProperty('submissionId');
  });

  it('throws error for missing file', () => {
    expect(() => readHouses('notfound.json')).toThrow();
  });

  it('throws error for invalid JSON', () => {
    const badFile = path.join(__dirname, 'bad.json');
    fs.writeFileSync(badFile, 'not json');
    expect(() => readHouses(badFile)).toThrow();
    fs.unlinkSync(badFile);
  });
});
