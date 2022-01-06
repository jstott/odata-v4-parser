const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {


  

  
/*   it("should parse json syntax-1", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->>fred eq 'csonl'"); // / or _ for column name
  });  */

/*   it("should parse json syntax-2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->>fred eq 'csonl'"); // / or _ for column name
  });  */
  it("should parse json syntax-3", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(shipto->>fred , 'csonl')"); // / or _ for column name
  }); 

  it("should parse json syntax-4", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(shipto_address->>'name' , 'ewis')"); // / or _ for column name
  });

  /** This does not work: quotes around 'fred' are throwing error */
  it("should parse json syntax-x", () => {
    var parser = new Parser();
    var error = false;
    try{
      var ast = parser.query("$filter=contains(shipto->>'fred' , 'csonl')"); // / or _ for column name
    }catch(err){
      error = true;
    }
    expect(error).to.be.false;
    
  });

  it("should parse json syntax-2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(shipto->'fred','csonl')"); // / or _ for column name
    console.log(ast);
  }); 
  it("should parse json syntax-3", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(ship_to->'fred'->'same','csonl')"); // / or _ for column name
    console.log(ast);
  }); 

  it("should parse json syntax-3-5", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(shipto->>'fred'->'same','csonl')"); // / need to allow for singlequotes around
    console.log(ast);
  }); 

  it("should parse json syntax-4", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=contains(shipto->>'fred' , 'csonl')"); // / or _ for column name
    console.log(ast);
  }); 

/*   it("should parse json syntax-2", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=shipto->>'fred' eq 'csonl'"); // / or _ for column name
  }); */ 
  
});
