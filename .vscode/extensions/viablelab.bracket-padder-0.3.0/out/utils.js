"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPairs = ['(', ')', '[', ']', '{', '}', '"', "'", '`'];
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const removePairs = (opening, closing) => (str) => {
    if (!closing) {
        closing = opening;
    }
    const regex = new RegExp(`${opening}([^${opening}]+(?=${closing}))${closing}`, 'g');
    return str.replace(regex, '');
};
const removeClosedPairs = compose((str) => str.split(''), removePairs("'"), removePairs('"'), removePairs('`'), removePairs('\\{', '\\}'), removePairs('\\[', '\\]'), removePairs('\\(', '\\)'));
function getUnclosedPairs(str) {
    const trimmed = removeClosedPairs(str);
    return trimmed.filter((char) => defaultPairs.indexOf(char) > -1);
}
exports.getUnclosedPairs = getUnclosedPairs;
function removeEscapedQuotes(str) {
    return str.replace(/(\\"|\\')/g, '');
}
exports.removeEscapedQuotes = removeEscapedQuotes;
function invert(obj) {
    return Object.keys(obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [obj[key]]: key })), {});
}
exports.invert = invert;
exports.reduceIntoKeyPairs = (obj, transform) => Object.keys(obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), transform(key, obj[key]))), {});
//# sourceMappingURL=utils.js.map