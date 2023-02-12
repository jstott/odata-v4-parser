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
    var ast = parser.query("$filter=bmsticketorder_shipto_address__name eq 'steve jopli'"); // / works!
   //console.log(ast);
 }); 

 
// 
it("contains_jsonb", () => {
  var parser = new Parser();
  var ast = parser.query("$filter=contains(shiptoAddress->>'name','Samuel Cruz')"); // works!
 //console.log(ast);
}); 


it("contains_spaces_jsonb_multiple", () => {
  var parser = new Parser();
  var ast = parser.query("$filter=contains(shiptoAddress->>'name','Air Camera') or contains(shiptoAddress->>'name','Air Camera') "); // works!
 //console.log(ast);
}); 
it("contains_spaces_jsonb_multiple_with_Samuel_Cruze", () => {
  var parser = new Parser();
  var ast = parser.query("$filter=contains(shiptoAddress->>'name','Samuel Cruz') or contains(shiptoAddress->>'name','Samuel Cruz')"); // works!
 //console.log(ast);
}); 
it("contains_spaces_full", () => {
  var parser = new Parser();
  //var ast = parser.query("$filter=(contains(shiptoAddress->>'name','Samuel Cruz') or contains(ticketNumber,'Samuel Cruz') or contains(orderId,'Samuel Cruz') or contains(accountName,'Samuel Cruz') or contains(name,'Samuel Cruz') or contains(partNumber,'Samuel Cruz') or contains(description,'Samuel Cruz') or contains(priority,'Samuel Cruz') or contains(subIssueType,'Samuel Cruz') or contains(outTrackingNumber,'Samuel Cruz') or contains(outShipStatus,'Samuel Cruz') or  contains(bmsticket__status,'Samuel Cruz') or contains(orderReason,'Samuel Cruz') or contains(primaryAssignee,'Samuel Cruz'))");
//
  var ast = parser.query("$filter=( contains(bmsticketorder__meta->>'selectedBinLoc', 'charles john') or contains(ticketNumber,'charles john')  or contains(orderId,'charles john')  or contains(accountName,'charles john')  or contains(name,'charles john')  or contains(partNumber,'charles john')  or contains(description,'charles john')  or contains(priority,'charles john')  or contains(subIssueType,'charles john')  or contains(outTrackingNumber,'charles john')  or contains(outShipStatus,'charles john')  or contains(shiptoAddress->>'city','charles john')  or contains(shiptoAddress->>'state','charles john')  or contains(shiptoAddress->>'email','charles john')  or contains(shiptoAddress->>'name','charles john')  or contains(shiptoAddress->>'postalCode','charles john')  or contains(shiptoAddress->>'street','charles john')  or contains(shiptoAddress->>'country','charles john')  or contains(bmsticket__status,'charles john')  or contains(orderReason,'charles john')  or contains(primaryAssignee,'charles john')  )"); // fails!
 //console.log(ast);
}); 
  
  
});
