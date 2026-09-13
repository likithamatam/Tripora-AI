import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Tripora AI Server',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    demoModeActive: true
  });
});

// 2. Natural language query parsing endpoint
app.post('/api/parse-nlp', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string required' });
  }

  const ai = getAI();
  if (!ai) {
    // If Gemini is not configured, return fallback empty so frontend handles with local parser
    return res.json({ parsed: null, reason: 'Demo local parser used' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Extract trip planning constraints from this user request: "${query}".
Return a JSON object with:
- from: string (origin city, default null if unknown)
- destination: string (destination city/region)
- durationDays: number (default 3 or 4 if unspecified)
- travelers: number (default 2 if unspecified)
- budget: number (in INR/rupees; if unspecified or unclear, null)
- travelStyle: string (one of: "Budget", "Balanced", "Comfort", "Luxury", "Adventure", "Backpacker")
- interests: array of strings (e.g. ["Beaches", "Food", "Sightseeing", "Culture", "Adventure", "Shopping", "Relaxation"])`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            from: { type: Type.STRING },
            destination: { type: Type.STRING },
            durationDays: { type: Type.INTEGER },
            travelers: { type: Type.INTEGER },
            budget: { type: Type.INTEGER },
            travelStyle: { type: Type.STRING },
            interests: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    res.json({ parsed: parsedJson, reason: 'Gemini AI structured extraction' });
  } catch (err: any) {
    console.warn('Gemini NLP parse warning (using local fallback):', err?.message);
    res.json({ parsed: null, error: err?.message });
  }
});

// 3. Optional enhanced agent recommendation endpoint
app.post('/api/agent-recommend', async (req, res) => {
  const { destination, budget, travelStyle, durationDays } = req.body;
  const ai = getAI();
  if (!ai) {
    return res.json({
      recommendation: `Optimized for ${durationDays} days in ${destination} within ₹${budget?.toLocaleString('en-IN') || 'your budget'}.`
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide a 2-sentence concise, expert agent travel rationale for a ${durationDays}-day trip to ${destination} with a budget of ₹${budget} and a ${travelStyle} style. Highlight high-value trade-offs and verified local highlights.`
    });
    res.json({ recommendation: response.text });
  } catch {
    res.json({
      recommendation: `Optimized for ${durationDays} days in ${destination} within ₹${budget?.toLocaleString('en-IN') || 'your budget'}.`
    });
  }
});

// Setup Vite middleware for development, or serve built static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tripora AI Server listening on port ${PORT}`);
  });
}

startServer();
