export function isValidSchedule(obj) {
    
    if (typeof obj !== 'object' 
        || Array.isArray(obj)) {
            return [false, 'Objektas turi buti "{key: value}" tipo objektas'];
    }
    
    if (!Object.keys(obj).includes('schedule')
        || Object.keys(obj).length > 1) {
        return [false, 'Objekte tegali buti raktas pavadinimu "schedule"'];
    }
    if (Object.values(obj)[0].lenght !== 7) {
        return [false, 'rakte "schedule" turi buti masyvas su septyniai masyvais'];
    }

    const abc = ' aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ';
    const allStringsInObject = Object.values(obj)[0].flat().join('');
    for (const letter of allStringsInObject) {
        if (!abc.includes(letter)) {
            return [false, `Zodyje yra neleistinas simbolis "${letter}"`];
        }
    }


    return [true, 'viskas ok']
}