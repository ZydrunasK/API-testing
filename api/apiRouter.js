import e from "express";
import { dictionaryRouter } from "./dictionaryRouter.js";
import { carsRouter } from "./carsRouter.js";

export const apiRouter = e.Router();

apiRouter.all('/', (req, res) => {
    return res.status(501).send('Not implemented');
});

apiRouter.use('/dictionary', dictionaryRouter);
apiRouter.use('/cars', carsRouter);
