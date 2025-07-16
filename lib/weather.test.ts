import { getWeather, getDegreeDays } from './weather';

jest.mock('https', () => {
  return {
    get: (url: string, options: any, callback: any) => {
      // Simulate different responses based on location in URL
      const locationMatch = url.match(/location=([^&]+)/);
      const location = locationMatch ? decodeURIComponent(locationMatch[1]) : '';
      let response;
      if (location === 'North-Eastern (Leeming)') {
        response = {
          statusCode: 200,
          setEncoding: jest.fn(),
          on: (event: string, handler: any) => {
            if (event === 'data') handler(JSON.stringify({
              location: {
                location: 'North-Eastern (Leeming)',
                degreeDays: '1111',
                groundTemp: '9',
                postcode: 'NE66',
                lat: '55.424',
                lng: '-1.583'
              }
            }));
            if (event === 'end') handler();
          },
        };
      } else if (location === 'NoRegion') {
        response = {
          statusCode: 404,
          resume: jest.fn(),
          setEncoding: jest.fn(),
          on: (event: string, handler: any) => {},
        };
      } else {
        response = {
          statusCode: 200,
          setEncoding: jest.fn(),
          on: (event: string, handler: any) => {
            if (event === 'data') handler(JSON.stringify({
              location: {
                location,
                degreeDays: '1000',
                groundTemp: '10',
                postcode: 'TEST',
                lat: '0',
                lng: '0'
              }
            }));
            if (event === 'end') handler();
          },
        };
      }
      callback(response);
      return { on: jest.fn() };
    }
  };
});

describe('getWeather', () => {
  it('returns weather data for North-Eastern (Leeming)', async () => {
    const data = await getWeather('North-Eastern (Leeming)');
    expect(data.location.degreeDays).toBe('1111');
  });

  it('returns error for missing region', async () => {
    const data = await getWeather('NoRegion');
    expect(data.error).toBe('Could not find design region');
  });
});

describe('getDegreeDays', () => {
  it('returns degree days as a number', async () => {
    const degreeDays = await getDegreeDays('North-Eastern (Leeming)');
    expect(degreeDays).toBe(1111);
  });

  it('throws error if degree days not found', async () => {
    await expect(getDegreeDays('NoRegion')).rejects.toThrow('Degree days not found in API response');
  });
});
