// Caso Práctico ZEPO-1 Laura Toledo Gutiérrez

import express, { Request, Response, NextFunction } from 'express';
import { Formula1Info } from './formula1Info';

const app = express();
const port = process.env.PORT || 3000;
const formula1Info = new Formula1Info();

// Middleware to allow CORS (Cross-Origin Resource Sharing) requests
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Get the Formula 1 information
app.get('/formula1', async (_req: Request, res: Response) => {
  try {
    const pilotData = await formula1Info.fetchDriversData();
    const pitStopsData = await formula1Info.fetchPitStopsData();

    const pilotsPitLessThan50 = formula1Info.filterDriversPitLessThan50(pilotData, pitStopsData);
    const spanishPilots = formula1Info.filterDriversByNationality(pilotData, "ESP");
    const finnishPilotsWithKK = formula1Info.filterDriversByNationalityAndNamePattern(pilotData, "ESP", "fer");

    const response = {
      pilotPitLessThan50: pilotsPitLessThan50,
      spanishPilot: spanishPilots,
      finnishPilotsWithKK: finnishPilotsWithKK,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching Formula 1 data' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  console.log(`ZEPO Practical Case 1 - FORMULA 1`);
  console.log(`To execute, use: http://localhost:${port}/formula1`);
});
