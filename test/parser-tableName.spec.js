const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {


    it("advanced is not null", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=vAsset__state is not null");
        console.log(ast);
        expect(ast.value.options[0].value.value.value).to.equal("\"vAsset.state\" IS NOT NULL");
    });

    it("table-column advanced is null", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=vAsset__state is null");
        console.log(ast);
        expect(ast.value.options[0].value.value.value).to.equal("\"vAsset.state\" IS NULL");
    });

    it("table-column advanced is nullOrEmpty", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=vAsset__state is nullOrEmpty");
        console.log(ast);

        expect(ast.value.options[0].value.value.value).to.equal("( \"vAsset.state\" IS NULL OR \"vAsset.state\" = '' )");

    });

});

