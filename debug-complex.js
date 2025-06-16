const Parser = require("./lib/parser").Parser;

console.log("=== Testing complex OR expression ===");
const parser = new Parser();
const ast = parser.query("$filter=(uom is nullOrEmpty or category ne 'Assigned')");

console.log("Full AST structure:");
console.log(JSON.stringify(ast, null, 2));
