export function isValidId(id) {
    if (typeof parseInt(id) !== "number"
    || !isFinite(id)
    || id < 1) {
        return [false, `ID ${id} yra netinkamas`];
    }
    return [true, 'viskas ok', Math.floor(parseInt(id)) - 1];
}