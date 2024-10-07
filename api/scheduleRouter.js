import e from "express";
import { isValidWeekSchedule } from "../lib/isValidWeekSchedule.js";
import { isValidDaySchedule } from "../lib/isValidDaySchedule.js";
import { isValidLesson } from "../lib/isValidLesson.js";
import { isValidId } from "../lib/isValidId.js";

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
        msg: 'nera tvarkarascio'
    });
});

scheduleRouter.get('/:dienosID', (req, res) => {
    
    const [isValidDayId, idMsg, id] = isValidId(req.params.dienosID);
    if (!isValidDayId) {
        return res.status(400).json({
            status: 'error',
            msg: idMsg
        });
    }

    if (!Object.keys(week).includes('schedule')) {
        return res.status(400).json({
            status: 'error',
            msg: 'nera tvarkarascio'
        });
    }
    return res.status(200).json(week.schedule[id]);
});

scheduleRouter.put('/:dienosID', (req, res) => {
    
    const [isValidDayId, idMsg, id] = isValidId(req.params.dienosID);
    if (!isValidDayId) {
        return res.status(400).json({
            status: 'error',
            msg: idMsg
        });
    }

    const [DayisValid, dayMsg] = isValidDaySchedule(req.body);
    if (!DayisValid) {
        return res.status(400).json({
            status: 'error',
            msg: dayMsg
        });
    }

    week.schedule[id] = req.body.schedule;
    return res.status(200).json({
        status: 'success',
        msg: 'dienos pamokos pakeistos'
    });
});

scheduleRouter.patch('/:dienosID/:pamokosID', (req, res) => {
    
    const [isValidDayId, dayMsg, dayId] = isValidId(req.params.dienosID);
    const [isValidLessonId, lessonMsg, lessonId] = isValidId(req.params.pamokosID);
    if (!isValidDayId
        || !isValidLessonId) {
        return res.status(400).json({
            status: 'error',
            msg: (isValidDayId ? lessonMsg : dayMsg)
        });
    }
    
    if (Object.keys(week).length !== 1) {
        return res.status(400).json({
            status: 'error',
            msg: `nera tvarkarascio`
        });
    }

    const [isValid, msg] = isValidLesson(req.body);
    if (!isValid) {
        return res.status(400).json({
            status: 'error',
            msg: msg
        });
    }

    week.schedule[dayId][lessonId] = req.body.lesson;
    week.schedule[dayId] = week.schedule[dayId].map(s => s === null ? "-" : s)
    return res.status(200).json({
        status: 'success',
        msg: `dienos ${dayId + 1} pamoka ${lessonId + 1} pakeista`
    });
});

scheduleRouter.delete('/:dienosID', (req, res) => {
    const [isValidDayId, idMsg, id] = isValidId(req.params.dienosID);
    if (!isValidDayId) {
        return res.status(400).json({
            status: 'error',
            msg: idMsg
        });
    }

    if (Object.keys(week).length !== 1) {
        return res.status(400).json({
            status: 'error',
            msg: 'nera ko trinti'
        });
    }

    week.schedule[dienosID] = [];
    return res.status(200).json({
        status: 'success',
        msg: `dienos ${id + 1} pamokos istrintos`
    });
});