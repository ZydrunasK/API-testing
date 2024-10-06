export function isValidWeekSchedule(obj) {
    

    if (!Object.keys(obj).includes('schedule')
        || Object.keys(obj).length !== 1) {
        return [false, 'Objekte turi buti tik raktas pavadinimu "schedule"'];
    }

    for (const el of Object.values(obj)[0]) {
        if (!Array.isArray(el)) {
            return [false, 'rakte "schedule" turi buti masyvas su septyniai masyvais'];
        }
    }

    if (Object.values(obj)[0].length !== 7) {
        console.log(Object.values(obj)[0].length);
        
        return [false, 'rakte "schedule" turi buti masyvas su septyniai masyvais'];
    }

    const abc = ' aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ-1234567890';
    const allStringsInObject = Object.values(obj)[0].flat().join('');
    for (const letter of allStringsInObject) {
        if (!abc.includes(letter)) {
            return [false, `Zodyje yra neleistinas simbolis ${letter}`];
        }
    }


    return [true, 'viskas ok'];
}

// if (typeof obj !== 'object' 
//     || Array.isArray(obj)) {
//         return [false, 'Objektas turi buti "{key: value}" tipo objektas'];
// }
