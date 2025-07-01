import express from 'express';
import { PORT } from './config/env';
import { PrismaClient } from '@prisma/client';
import taskRouter from './v1/routes/task.route';
import cors from 'cors';
const app = express();

const db = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// APi routes 
app.use('/api/v1/tasks', taskRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
export { db }; // Export the Prisma client for use in other modules