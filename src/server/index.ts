import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { z } from 'zod';
import * as jose from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Schema validation
const TransactionSchema = z.object({
  senderNumber: z.string(),
  amount: z.number(),
  date: z.string(),
  time: z.string(),
  reference: z.string(),
  status: z.enum(['completed', 'pending', 'failed'])
});

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
let sheetsApi: any = null;

async function initializeGoogleSheets() {
  try {
    const auth = await authenticate({
      keyfilePath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: SCOPES,
    });

    sheetsApi = google.sheets({ version: 'v4', auth });
    console.log('Google Sheets API initialized');
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
  }
}

// Routes
app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = TransactionSchema.parse(req.body);
    
    // Log to Google Sheets
    if (sheetsApi) {
      await sheetsApi.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Sheet1!A:F',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[
            transaction.date,
            transaction.time,
            transaction.senderNumber,
            transaction.amount,
            transaction.reference,
            transaction.status
          ]]
        }
      });
    }

    // Emit real-time update
    io.emit('newTransaction', transaction);
    
    res.status(201).json({ message: 'Transaction logged successfully' });
  } catch (error) {
    console.error('Error logging transaction:', error);
    res.status(400).json({ error: 'Invalid transaction data' });
  }
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Initialize and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  await initializeGoogleSheets();
  
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();