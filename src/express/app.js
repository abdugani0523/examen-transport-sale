import express from 'express';
import { join } from 'path';
import cors from 'cors'
// 
const app = express();

// Set static folder
app.use(express.static(join(process.cwd(), 'assets')))

// Cors
app.use(cors())

export default app;