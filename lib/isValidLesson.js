export function isValidLesson(obj) {

    if (!Object.keys(obj).includes('lesson')
        || Object.keys(obj).length !== 1) {
        return [false, 'Objekte turi buti tik raktas pavadinimu "lesson"'];
    }

    if ( typeof Object.values(obj)[0] !== 'string') {
        return [false, 'rakte turi buti "string"'];
    }

    const abc = ' aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ-1234567890';
    for (const letter of Object.values(obj)[0]) {
        if (!abc.includes(letter)) {
            return [false, `Zodyje yra neleistinas simbolis "${letter}"`];
        }
    }
    return [true, 'viskas ok'];
}