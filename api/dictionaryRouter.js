import express from 'express';
import { isValidWord } from '../lib/isValidWord.js';
import { isInDictionary } from '../lib/isInDictionary.js';

let dictionary = [];

export const dictionaryRouter = express.Router();

dictionaryRouter.get('/', (req, res) => {
    return res.status(200).json({ dictionary });
});

dictionaryRouter.post('/', (req, res) => {
    const requiredKeys = ['word'];

    if (Object.keys(req.body).length !== requiredKeys.length) {
        return res.status(400).json({
            status: 'error',
            msg: 'Neteisingas objekto raktu kiekis',
        });
    }

    const { word } = req.body;

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(word, dictionary);
    if (wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }

    dictionary.push(word);

    return res.status(201).json({
        status: 'success',
        msg: 'Naujas zodis priimtas sekmingai',
    });
});

dictionaryRouter.put('/:word', (req, res) => {
    const { newWord } = req.body;
    const { word } = req.params;

    const [newWordValid, newWordMsg] = isValidWord(newWord);
    if (!newWordValid) {
        return res.status(400).json({
            status: 'error',
            msg: newWordMsg,
        });
    }

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(newWord, dictionary);
    if (wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }

    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i].toLowerCase() === word.toLowerCase()) {
            dictionary[i] = newWord;

            return res.status(200).json({
                status: 'success',
                msg: 'Zodis sekmingai pakeistas',
            });
        }
    }

    return res.status(400).json({
        status: 'error',
        msg: `Norimas keisti zodis nerastas`,
    });
});

dictionaryRouter.delete('/:word', (req, res) => {
    const { word } = req.params;

    const [wordValid, wordMsg] = isValidWord(word);
    if (!wordValid) {
        return res.status(400).json({
            status: 'error',
            msg: wordMsg,
        });
    }

    const [wordFound, wordFoundMsg] = isInDictionary(word, dictionary);
    if (!wordFound) {
        return res.status(400).json({
            status: 'error',
            msg: wordFoundMsg,
        });
    }

    dictionary = dictionary.filter(fw => fw.toLowerCase() !== word.toLowerCase());

    return res.status(200).json({
        status: 'success',
        msg: 'Zodis sekmingai isstrintas',
    });
});

dictionaryRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Bandai kazka kas nesuplanuota...',
    });
});