import e from "express";

const cars = [];



export const carsRouter = e.Router();

carsRouter.get('/', (req, res) => {
    return res.status(200).json({ cars });
});

carsRouter.post('/', (req, res) => {

    const requiredKeys = ['brand', 'model', 'id'];

    if (Object.keys(req.body).length !== requiredKeys.length) {
        return res.status(400).json({
            status: 'error',
            msg: 'Neteisingas objekto raktu kiekis',
        });
    }

    if (typeof req.body.model !== 'string'
        || typeof req.body.brand !== 'string'
        || typeof req.body.id !== 'number') {
        return res.status(400).json({
            status: 'error',
            msg: 'neteisingi duomenu tipai',
        });
    }


    cars.push(req.body);

    return res.status(200).json({
        status: 'success',
        msg: `i cars masyva itraukta ${req.body.brand} ${req.body.model}`,
    });
});

carsRouter.put('/', (req, res) => {

    for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === req.body.id) {
            cars[i].price = req.body.price;
            return res.status(200).json({
                status: 'success',
                msg: `prideta kaina automobiliu id:${req.body.id}`,
            });
        }  
    }

    return res.status(400).json({
        status: 'error',
        msg: 'kazkas negerai',
    });
});