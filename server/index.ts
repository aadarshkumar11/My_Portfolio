import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { chatHandler } from './backend/handler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json());

// API route
app.post('/api/chat', chatHandler);

// Serve static files from Vite's build (for production)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
