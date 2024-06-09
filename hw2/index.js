// index.js

function capitalize(str) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.split('').reverse().join('');
}

function toCamelCase(str) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.replace(/[-_](.)/g, (_, chr) => chr.toUpperCase());
}

module.exports = {
    capitalize,
    reverseString,
    toCamelCase
};
