const Parser = require("./lib/parser").Parser;

console.log("=== Testing 'is null' case ===");
const parser1 = new Parser();
const ast1 = parser1.query("$filter=category is null");

console.log("ast1.value.options[0].value.value.value:", ast1.value.options[0].value.value.value);

console.log("\n=== Testing 'eq' case ===");
const parser2 = new Parser();
const ast2 = parser2.query("$filter=category eq 'Assigned'");

console.log("ast2.value.options[0].value.value.value:", ast2.value.options[0].value.value.value);

console.log("\n=== Comparing structures ===");
console.log("is null ast structure:");
console.log(JSON.stringify(ast1.value.options[0].value.value, null, 2));

console.log("\neq ast structure:");
console.log(JSON.stringify(ast2.value.options[0].value.value, null, 2));
