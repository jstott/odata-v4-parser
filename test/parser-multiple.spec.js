const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Multi", () => {

    it("snakeCase is nullOrEmpty", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=(isAssigned is nullOrEmpty or isAssigned ne 'Assigned')");
       // console.log(ast);
        expect(ast.value.options[0].value.value.value.left.value.value).to.equal("( \"isAssigned\" IS NULL OR \"isAssigned\" = '' )");
        expect(ast.value.options[0].value.value.value.right.value.right.raw).to.equal("'Assigned'");
      });

     

    it("multi-sample_0", () => {
        var parser = new Parser();
        var ast = parser.query("$filter=(inReceiptDate is not null) and (ticketStatus eq 'Scheduled')");
        expect(ast.value.options[0].value.type).to.equal("AndExpression");
        expect(ast.value.options[0].value.value.left.raw).to.equal("(inReceiptDate is not null)");
        expect(ast.value.options[0].value.value.left.value.value.raw).to.equal("inReceiptDate is not null");
        expect(ast.value.options[0].value.value.right.value.raw).to.equal("ticketStatus eq 'Scheduled'");
        console.log(ast);
    });


});