export function isInDictionary(text, list) {
    for (const word of list) {
        if (word.toLowerCase() === text.toLowerCase()) {
            return [true, 'Toks zodis jau egzistuoja'];
        }
    }

    return [false, 'Nauja reiksme'];
}