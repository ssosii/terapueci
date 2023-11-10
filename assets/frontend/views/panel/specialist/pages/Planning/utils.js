export const sortFields = (array) => {
    array.sort((a, b) => {
        return b.time.localeCompare(a.time);
    });
    return array;
}


export const sortRanges = (array) => {
    array.sort((a, b) => {
        const first = a.range.split('-')[0];
        const second = b.range.split('-')[0];
        console.log("test", parseInt(first), parseInt(second));
        return parseInt(second) - parseInt(first);
    });
    return array;
}
