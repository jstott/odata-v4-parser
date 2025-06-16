const Parser = require("./lib/parser").Parser;

console.log("Testing field name transformation:");

const parser = new Parser();
const ast = parser.query("$filter=vAsset__state is null");

console.log("Input: vAsset__state is null");
console.log("Output:", ast.value.options[0].value.value.value);
console.log("Expected: \"vAsset.state\" IS NULL");
console.log("Match:", ast.value.options[0].value.value.value === '"vAsset.state" IS NULL');
