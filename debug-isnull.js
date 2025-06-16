const Parser = require("./lib/parser").Parser;

console.log("=== Testing 'is null' (working case) ===");
const parser = new Parser();
const ast = parser.query("$filter=category is null");

console.log("ast.value.options[0].value.value.value:", ast.value.options[0].value.value.value);
console.log("Full structure:");
console.log(JSON.stringify(ast.value.options[0].value.value, null, 2));
