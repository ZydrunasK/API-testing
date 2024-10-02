export function isInDictionary(text, list) {
    for (const word of list) {
        if (word.toLowerCase() === text.toLowerCase()) {
            return [true, 'Toks zodis jau egzistuoja'];
        }
    }
    for (const letter of text) {
        if (!abc.includes(letter)) {
            return [false, `Zodyje yra neleistinas simbolis "${letter}"`];
        }
    }

    return [false, 'Nauja reiksme'];
}