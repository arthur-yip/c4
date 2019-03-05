export function tails(xs) {
    const ys = [];
    for(let i = 0; i <= xs.length; i++) {
        ys.push(xs.slice(i));
    }
    return ys;
}

export function isInfixOf(xs, s) {
    return tails(xs).some((x) => x.startsWith(s));
}

export function shift(str, pos) {
    return str.slice(pos) + str.slice(0, pos);
}
