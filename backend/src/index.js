import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import salesRouter from './routes/sales.js';

const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/sales', salesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
