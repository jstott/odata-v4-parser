const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {


   it("should parse json syntax-5", () => {
     var parser = new Parser();
     var ast = parser.query("$filter=meta->'order'->'shipTo'->>'name eq 'Kari Driver'"); // / works!
    console.log(ast);
   });  
 

   it("simple eq null", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=category eq null");
    console.log(ast);
  });

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

    it("simple equal", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=category eq 'Assigned'");
    console.log(ast);
    // Build the expected SQL-like string from the structure
    var leftStr = `"${ast.value.options[0].value.value.left.raw}"`;
    var rightStr = ast.value.options[0].value.value.right.raw;
    var expectedString = `${leftStr} eq ${rightStr}`;
    expect(expectedString).to.equal("\"category\" eq 'Assigned'");
  });



 
  
  it("simple is nullOrEmpty-2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=(state is nullOrEmpty)");
    console.log(ast);
    expect(ast.value.options[0].value.value.value.value).to.equal("( \"state\" IS NULL OR \"state\" = '' )");
  });

  it("simple is nullOrEmpty-3", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=((state is nullOrEmpty))");
    console.log(ast);
    expect(ast.value.options[0].value.value.value.value.value).to.equal("( \"state\" IS NULL OR \"state\" = '' )");
  });
 



  it("deeper is null", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=(uom is null or category ne 'Assigned')");
    console.log(ast);
    expect(ast.value.options[0].value.value.value.left.value.value).to.equal("\"uom\" IS NULL");
   // expect(ast.value.options[0].value.value.value.right.value.right.raw).to.equal("'Assigned'");
  });

  it("deeper is nullOrEmpty", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=(uom is nullOrEmpty or category ne 'Assigned')");
   // console.log(ast);
    expect(ast.value.options[0].value.value.value.left.value.value).to.equal("( \"uom\" IS NULL OR \"uom\" = '' )");
    expect(ast.value.options[0].value.value.value.right.value.right.raw).to.equal("'Assigned'");
  });

  it("snakeCase is nullOrEmpty", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=(isAssigned is nullOrEmpty or isAssigned ne 'Assigned')");
   // console.log(ast);
    expect(ast.value.options[0].value.value.value.left.value.value).to.equal("( \"isAssigned\" IS NULL OR \"isAssigned\" = '' )");
    expect(ast.value.options[0].value.value.value.right.value.right.raw).to.equal("'Assigned'");
  });

});
