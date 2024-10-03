export function isValidDaySchedule(obj) {
    

    if (!Object.keys(obj).includes('schedule')
        || Object.keys(obj).length !== 1) {
        return [false, 'Objekte turi buti tik raktas pavadinimu "schedule"'];
    }

    if (!Array.isArray(Object.values(obj)[0])) {
        return [false, 'rakte "schedule" turi buti masyvas su pamokomis'];
    }
    
    for (const str of Object.values(obj)[0]) {
        if (typeof str !== 'string') {
            return [false, `pamokos turi buti "string" tipo zodziai`];
        }
    }

    const abc = ' aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ-1234567890';
    const allStringsInObject = Object.values(obj)[0].join('');
    for (const letter of allStringsInObject) {
        if (!abc.includes(letter)) {
            return [false, `Zodyje yra neleistinas simbolis "${letter}"`];
        }
    }
    return [true, 'viskas ok'];
}