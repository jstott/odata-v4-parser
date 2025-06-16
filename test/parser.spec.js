const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {
  it("should instantiate odata parser", () => {
    var parser = new Parser();
    var ast = parser.filter("Categories/all(d:d/Title eq 'alma')");
    expect(
      ast.value.value.value.value.next.value.value.predicate.value.value.right
        .value
    ).to.equal("Edm.String");
  });

  it("should parse query string", () => {
    var parser = new Parser();
    //var ast = parser.query("$filter=contains(Location/Address, 'San Francisco')");
    var ast = parser.query("$filter=contains(Location/Address, 'San Francisco')");
    expect(ast.value.options[0].type).to.equal("Filter");
  });

  it("should parse query Lambda Operators", () => {
    var parser = new Parser();
    //var ast = parser.query("$filter=contains(Location/Address, 'San Francisco')");
    // The request below returns People with Emails containing "ll@contoso.com". The Emails is a collection of primitive type string.
    var ast = parser.query("$filter=Emails/any(s:endswith(s, 'contoso.com'))");
    expect(ast.value.options[0].type).to.equal("Filter");
  });

  it("should parse query Lambda Operators2", () => {
    var parser = new Parser();
    //var ast = parser.query("$filter=contains(Location/Address, 'San Francisco')");
    // The request below returns the friends of Me who have friends using "Scott" as their FirstName.
    var ast = parser.query("$filter=Friends/any(f:f/FirstName eq 'Scott')");
    expect(ast.value.options[0].type).to.equal("Filter");
  });


  it("should parse query string", () => {
    var parser = new Parser();
    var ast = parser.query("$filter=Title eq 'alma'");
    console.log(ast);
    expect(ast.value.options[0].type).to.equal("Filter");
    console.log(ast.value.options[0].value.value.value);
    //    expect(ast.value.options[0].value.value.value).to.equal("\"Title\" eq 'alma'");
  });

  it("should parse multiple orderby params", () => {
    var parser = new Parser();
    var ast = parser.query("$orderby=foo,bar");
    expect(ast.value.options[0].value.items[0].raw).to.equal("foo");
    expect(ast.value.options[0].value.items[1].raw).to.equal("bar");
  });

  it("should parse custom query options", () => {
    var parser = new Parser();
    var ast = parser.query("foo=123&bar=foobar");
    expect(ast.value.options[0].value.key).to.equal("foo");
    expect(ast.value.options[0].value.value).to.equal("123");
    expect(ast.value.options[1].value.key).to.equal("bar");
    expect(ast.value.options[1].value.value).to.equal("foobar");
  });
  

  it("should throw error parsing invalid custom query options", () => {
    var parser = new Parser();
    var error = false;
    try{
      var ast = parser.query("$foo=123");
      error = true;
    }catch(err){}
    expect(error).to.be.false;
  });
});
