const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {


    it("advanced is not null", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=vAsset__state is null");
        console.log(ast);
        expect(ast.value.options[0].value.value.value).to.equal("\"vAsset.state\" IS NULL");
    });

});

