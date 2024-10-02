import e from "express";

let week = {};

export const scheduleRouter = e.Router();

scheduleRouter.post('/', (req, res) => {
    week = req.body ;
    return res.status(200).json(req.body);
})

scheduleRouter.get('/', (req, res) => {
    return res.status(200).json(week);
})

scheduleRouter.get('/:dienosID', (req, res) => {
    return res.status(200).json(week.schedule[req.params.dienosID - 1]);
})

scheduleRouter.put('/:dienosID', (req, res) => {
    week.schedule[req.params.dienosID - 1] = req.body.schedule;
    return res.status(200).json(week.schedule[req.params.dienosID - 1]);
})

scheduleRouter.patch('/:dienosID/:pamokosID', (req, res) => {
    const dienosID = req.params.dienosID - 1;
    const pamokosID = req.params.pamokosID - 1;
    week.schedule[dienosID][pamokosID] = req.body.class;
    return res.status(200).json(week.schedule[dienosID][pamokosID]);
})

scheduleRouter.delete('/:dienosID', (req, res) => {
    const dienosID = req.params.dienosID - 1;
    week.schedule[dienosID] = [];
    return res.status(200).json(week.schedule[dienosID]);
})