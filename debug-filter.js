const Parser = require("./lib/parser").Parser;

const parser = new Parser();
const ast = parser.filter("Categories/all(d:d/Title eq 'alma')");

console.log("Filter AST structure:");
console.log(JSON.stringify(ast, null, 2));

console.log("\nTrying to access the test path:");
console.log("ast.value:", ast.value);
console.log("ast.value.value:", ast.value?.value);
console.log("ast.value.value.value:", ast.value?.value?.value);
console.log("ast.value.value.value.value:", ast.value?.value?.value?.value);
