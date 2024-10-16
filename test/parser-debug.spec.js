const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {

  /*
   it("should parse json syntax-5", () => {
     var parser = new Parser();
     var ast = parser.query("$filter=meta->'order'->'shipTo'->>'name eq 'Kari Driver'"); // / works!
    console.log(ast);
   });  
   */

  it("simple is null", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=category is null");
    console.log(ast);
    expect(ast.value.options[0].value.value.value).to.equal("\"category\" IS NULL");
  });

  it("simple is not null", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=category is not null");
    console.log(ast);
    expect(ast.value.options[0].value.value.value).to.equal("\"category\" IS NOT NULL");
  });

  it("deeper is null", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=(uom is null or category ne 'Assigned')");
    console.log(ast);
    expect(ast.value.options[0].value.value.value.left.value.value).to.equal("\"uom\" IS NULL");
    expect(ast.value.options[0].value.value.value.right.value.right.raw).to.equal("'Assigned'");
  });



});
