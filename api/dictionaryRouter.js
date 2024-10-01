import e from "express";

const dictionary = [];



export const dictionaryRouter = e.Router();

dictionaryRouter.get('/', (req, res) => {
    return res.status(200).json({ dictionary });
});

dictionaryRouter.post('/', (req, res) => {
    dictionary.push(req.body.word);
    
    return res.status(201).json({
        stats: 'success',
        msg: 'Naujas zodis priimtas sekmingai',
    });
});

dictionaryRouter.put('/', (req, res) => {
    return res.status(501).send('(PUT) Dictionary: Not implemented');
});

dictionaryRouter.delete('/', (req, res) => {
    return res.status(501).send('(DELETE) Dictionary: Not implemented');
});

