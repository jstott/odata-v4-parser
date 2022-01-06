const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {

   it("should parse json syntax-1", () => {
    var parser = new Parser();
    //var ast = parser.query("$filter=jsonb(shipto->>fred->'same','csonl')"); // / this works,
    var ast = parser.query("$filter=contains(meta->body->custom_fields->>'rma_status', 'csonl')"); // works
    //var ast = parser.query("$filter=contains(shipto->>'fred', 'csonl')"); // / works!
    //var ast = parser.query("$filter=shipto->>'fred' ne 'csonl'"); // / works!

   // var ast = parser.query("$filter=shipto->[0]'fred'->>'address' ne 'csonl'"); // / works!
    //console.log(ast);
  });  


  it("should parse json syntax-2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->>'fred' eq 'csonl'"); // / works!
   //console.log(ast);
  }); 

   it("should parse json syntax-3", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->>'fred' ne 'csonl'"); // / works!
   //console.log(ast);
  });  
  it("should parse json syntax-4", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->0-->'fred' ne 'csonl'"); // / works!
   //console.log(ast);
  });  
  it("should parse json syntax-5", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=meta->'order'->'shipTo'->>'name ne 'KariDriver'"); // / works!
   //console.log(ast);
  });  

   it("table-column_snake", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=bmsTicket_status eq 'Pending Customer'"); // / works!
   //console.log(ast);
  }); 

  it("table-column_snake2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=bmsticketorder_shipto_address__name eq 'Daniel McDonald'"); // / works!
   //console.log(ast);
 }); 

  
  
});
