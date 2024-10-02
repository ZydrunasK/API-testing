import e from "express";

const cars = [];



export const carsRouter = e.Router();

carsRouter.get('/', (req, res) => {
    return res.status(200).json({ cars });
});

carsRouter.post('/', (req, res) => {

    const requiredKeys = ['brand', 'model']

    if (Object.keys(req.body).length !== requiredKeys.length) {
        return res.status(400).json({
            status: 'error',
            msg: 'Neteisingas objekto raktu kiekis',
        });
    }

    if (typeof req.body.model !== 'string'
        || typeof req.body.brand !== 'string') {
        return res.status(400).json({
            status: 'error',
            msg: 'leidziami tik string tipo duomenys',
        });
    }


    cars.push(req.body);

    return res.status(200).json({
        status: 'success',
        msg: `i cars masyva itraukta ${req.body.brand} ${req.body.model}`,
    });
})