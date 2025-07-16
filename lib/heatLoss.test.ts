import { calculateHeatLoss, calculatePowerHeatLoss, readHouses, House } from './heatLoss';
import * as weather from './weather';
import fs from 'fs';
import path from 'path';

jest.mock('./weather');

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

describe('calculatePowerHeatLoss', () => {
  beforeAll(() => {
    (weather.getDegreeDays as unknown as jest.Mock).mockImplementation(async (location: string) => {
      if (location === 'Borders (Boulmer)') return 2483;
      if (location === 'NoRegion') throw new Error('Warning: Could not find design region');
      return 1000;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('calculates power heat loss correctly for valid input', async () => {
    const house: House = {
      submissionId: 'test-house',
      floorArea: 100,
      heatingFactor: 2,
      insulationFactor: 1.5,
      designRegion: 'Borders (Boulmer)'
    };
    const result = await calculatePowerHeatLoss(house);
    expect(result).toBeCloseTo(300 / 2483, 5);
  });

  it('throws error if designRegion is missing', async () => {
    const house: House = {
      submissionId: 'test-house',
      floorArea: 100,
      heatingFactor: 2,
      insulationFactor: 1.5
    };
    await expect(calculatePowerHeatLoss(house)).rejects.toThrow('House is missing designRegion for degree days lookup');
  });

  it('throws error if degree days not found', async () => {
    const house: House = {
      submissionId: 'test-house',
      floorArea: 100,
      heatingFactor: 2,
      insulationFactor: 1.5,
      designRegion: 'NoRegion'
    };
    await expect(calculatePowerHeatLoss(house)).rejects.toThrow('Warning: Could not find design region');
  });
});
