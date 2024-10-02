import e from "express";
import { isValidWeekSchedule } from "../lib/isValidWeekSchedule.js";

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
    return res.status(200).json(week);
});

scheduleRouter.get('/:dienosID', (req, res) => {
    return res.status(200).json(week.schedule[req.params.dienosID - 1]);
});

scheduleRouter.put('/:dienosID', (req, res) => {
    const [isValid, msg] = isValidWeekSchedule(req.body, 1);
    if (isValid) {
        week.schedule[req.params.dienosID - 1] = req.body.schedule;
        return res.status(200).json({
            status: 'success',
            msg: 'visos dienos pamokos pakeistos'
        });
    }
    return res.status(400).json({
        status: 'error',
        msg: msg
    });

    
    return res.status(200).json(week.schedule[req.params.dienosID - 1]);
});

scheduleRouter.patch('/:dienosID/:pamokosID', (req, res) => {
    const dienosID = req.params.dienosID - 1;
    const pamokosID = req.params.pamokosID - 1;
    week.schedule[dienosID][pamokosID] = req.body.class;
    return res.status(200).json(week.schedule[dienosID][pamokosID]);
});

scheduleRouter.delete('/:dienosID', (req, res) => {
    const dienosID = req.params.dienosID - 1;
    week.schedule[dienosID] = [];
    return res.status(200).json(week.schedule[dienosID]);
});