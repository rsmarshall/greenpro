import https from 'https';
import 'dotenv/config';

export async function getWeather(location: string): Promise<any> {
  const apiKey = process.env['X-API-KEY'] || process.env.WEATHER_API_KEY;
  if (!apiKey) throw new Error('X-API-KEY or WEATHER_API_KEY environment variable not set');

  const url = `https://063qqrtqth.execute-api.eu-west-2.amazonaws.com/v1/weather?location=${encodeURIComponent(location)}`;

  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'x-api-key': apiKey,
      },
    }, (res) => {
      if (res.statusCode === 404) {
        res.resume(); // Ensure the response is fully consumed
        resolve({ error: 'Could not find design region' });
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', (err) => {
        res.resume(); // Ensure the response is fully consumed on error
        reject(err);
      });
    });
    req.on('error', reject);
  });
}

export async function getDegreeDays(location: string): Promise<number> {
  const data = await getWeather(location);
  if (
    data &&
    data.location &&
    typeof data.location.degreeDays !== 'undefined'
  ) {
    return Number(data.location.degreeDays);
  }
  throw new Error('Degree days not found in API response');
}
