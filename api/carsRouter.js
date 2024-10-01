import e from "express";

const cars = [];



export const carsRouter = e.Router();

carsRouter.get('/', (req, res) => {
    return res.status(200).json({ cars });
});