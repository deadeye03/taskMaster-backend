import app, { db } from './app';
import { PORT } from './config/env';

db.$connect()
    .then(async () => {
        console.log('✅ Database connected...');
        app
            .listen(PORT, () => {
                console.log(`⚙️  Server running on: ${PORT}`);
            })
            .on('error', error => {
                console.log(error);
            });
    })
    .catch((err: any) => {
        console.log(err);
        process.exit(1);
    });
