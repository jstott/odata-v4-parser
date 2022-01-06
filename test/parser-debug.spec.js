const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {

 
  it("should parse json syntax-5", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=meta->'order'->'shipTo'->>'name eq 'Kari Driver'"); // / works!
   //console.log(ast);
  });  
  


});
