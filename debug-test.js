const Parser = require("./lib/parser").Parser;

const parser = new Parser();
const ast = parser.query("$filter=category eq 'Assigned'");

console.log("Full AST structure:");
console.log(JSON.stringify(ast, null, 2));

console.log("\nTrying different paths:");
console.log("ast.value:", ast.value);
console.log("ast.value.options:", ast.value.options);
if (ast.value.options && ast.value.options[0]) {
  console.log("ast.value.options[0]:", ast.value.options[0]);
  console.log("ast.value.options[0].value:", ast.value.options[0].value);
  if (ast.value.options[0].value) {
    console.log("ast.value.options[0].value.value:", ast.value.options[0].value.value);
    if (ast.value.options[0].value.value) {
      console.log("ast.value.options[0].value.value.value:", ast.value.options[0].value.value.value);
    }
  }
}
