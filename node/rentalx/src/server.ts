import express from 'express';

import { categoriesRouter } from './routes/categories.routes';

const app = express();

app.use('/categories', categoriesRouter);

app.listen(3001, () => console.log('Server started!'));
