# StringManimpulator

This library provides useful string manipulation functions.

## Installation

```sh
npm install StringManimpulator

Usage
const { capitalize, reverseString, toCamelCase } = require('StringManimpulator');

console.log(capitalize('hello')); // "Hello"
console.log(reverseString('hello')); // "olleh"
console.log(toCamelCase('hello_world')); // "helloWorld"

Functions
capitalize(str)

Capitalize the first letter of the string.
reverseString(str)

Reverse the given string.
toCamelCase(str)

Convert a string to camelCase.