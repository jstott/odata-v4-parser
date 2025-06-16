const Parser = require("./lib/parser").Parser;

const parser = new Parser();
const ast = parser.query("$filter=category eq 'Assigned'");

console.log("ast.value.options[0].value.value:", ast.value.options[0].value.value);
console.log("Type:", typeof ast.value.options[0].value.value);

if (ast.value.options[0].value.value.left) {
  console.log("Structure has left/right");
  console.log("Left:", ast.value.options[0].value.value.left.raw);
  console.log("Right:", ast.value.options[0].value.value.right.raw);
} else {
  console.log("Structure is:", ast.value.options[0].value.value);
}
