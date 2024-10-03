import e from "express";
import { isValidWeekSchedule } from "../lib/isValidWeekSchedule.js";
import { isValidDaySchedule } from "../lib/isValidDaySchedule.js";
import { isValidLesson } from "../lib/isValidLesson.js";

let week = {};

export const scheduleRouter = e.Router();

scheduleRouter.post('/', (req, res) => {
    const [isValid, msg] = isValidWeekSchedule(req.body);
    if (isValid) {
        week = req.body ;
        return res.status(200).json({
            status: 'success',
            msg: 'sukurtas naujas tvarkarastis'
        });
    }
    return res.status(400).json({
        status: 'error',
        msg: msg
    });
});

scheduleRouter.get('/', (req, res) => {
    if (Object.keys(week).length === 1) {
        return res.status(200).json(week);
    }
    return res.status(400).json({
        status: 'error',
        msg: 'nera ko grazinti'
    });
});

scheduleRouter.get('/:dienosID', (req, res) => {
    if (Array.isArray(week.schedule[req.params.dienosID - 1])) {
        return res.status(200).json(week.schedule[req.params.dienosID - 1]);
    }
    return res.status(400).json({
        status: 'error',
        msg: 'nera ko grazinti'
    });
});

scheduleRouter.put('/:dienosID', (req, res) => {
    const [isValid, msg] = isValidDaySchedule(req.body);
    if (isValid) {
        week.schedule[req.params.dienosID - 1] = req.body.schedule;
        return res.status(200).json({
            status: 'success',
            msg: 'dienos pamokos pakeistos'
        });
    }
    return res.status(400).json({
        status: 'error',
        msg: msg
    });
});

scheduleRouter.patch('/:dienosID/:pamokosID', (req, res) => {
    
    if (Object.keys(week).length !== 1) {
        return res.status(400).json({
            status: 'error',
            msg: `nera tvarkarascio`
        });
    }

    const dienosID = req.params.dienosID - 1;
    const pamokosID = req.params.pamokosID - 1;
    if (week.schedule[dienosID][pamokosID] === undefined) {
        return res.status(400).json({
            status: 'error',
            msg: `nera pamokos ${pamokosID + 1}`
        });
    }
    
    const [isValid, msg] = isValidLesson(req.body);
    if (isValid) {
        week.schedule[dienosID][pamokosID] = req.body.lesson;
        return res.status(200).json({
            status: 'success',
            msg: `pamoka ${pamokosID + 1} pakeista`
        });
    }
    return res.status(400).json({
        status: 'error',
        msg: msg
    });
});

scheduleRouter.delete('/:dienosID', (req, res) => {
    if (Object.keys(week).length === 1) {
        const dienosID = req.params.dienosID - 1;
        week.schedule[dienosID] = [];
        return res.status(200).json({
            status: 'success',
            msg: `dienos pamokos istrintos`
        });
    }
    return res.status(400).json({
        status: 'error',
        msg: 'nera ko trinti'
    });
});