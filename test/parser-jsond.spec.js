const expect = require("chai").expect;

const Parser = require("../lib/parser").Parser;

describe("Parser", () => {


    it("order_sample_0", () => {
        var parser = new Parser();
        let query ="( contains(bmsticketorder__meta->>'selectedBinLoc', 'charles john') or contains(ticketNumber,'charles john')  or contains(orderId,'charles john')  or contains(accountName,'charles john')  or contains(name,'charles john')  or contains(partNumber,'charles john')  or contains(description,'charles john')  or contains(priority,'charles john')  or contains(subIssueType,'charles john')  or contains(outTrackingNumber,'charles john')  or contains(outShipStatus,'charles john')  or contains(shiptoAddress->>'city','charles john')  or contains(shiptoAddress->>'state','charles john')  or contains(shiptoAddress->>'email','charles john')  or contains(shiptoAddress->>'name','charles john')  or contains(shiptoAddress->>'postalCode','charles john')  or contains(shiptoAddress->>'street','charles john')  or contains(shiptoAddress->>'country','charles john')  or contains(bmsticket__status,'charles john')  or contains(orderReason,'charles john')  or contains(primaryAssignee,'charles john')  )"; 
        let filter = `$filter=${query}`;
        var ast = parser.query(filter);
    });

    it("order_sample_1", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve jo') or contains(ticketNumber,'steve jo')  or contains(orderId,'steve jo')  or contains(accountName,'steve jo')  or contains(name,'steve jo')  or contains(partNumber,'steve jo')  or contains(description,'steve jo')  or contains(priority,'steve jo')  or contains(subIssueType,'steve jo')  or contains(outTrackingNumber,'steve jo')  or contains(outShipStatus,'steve jo')  or contains(shiptoAddress->>'city','steve jo')  or contains(shiptoAddress->>'state','steve jo')  or contains(shiptoAddress->>'email','steve jo')  or contains(shiptoAddress->>'name','steve jo')  or contains(shiptoAddress->>'postalCode','steve jo')  or contains(shiptoAddress->>'street','steve jo')  or contains(shiptoAddress->>'country','steve jo')  or contains(bmsticket__status,'steve jo')  or contains(orderReason,'steve jo')  or contains(primaryAssignee,'steve jo')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter);
    });
  
      it("order_sample_2", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Steve J') or contains(ticketNumber,'Steve J')  or contains(orderId,'Steve J')  or contains(accountName,'Steve J')  or contains(name,'Steve J')  or contains(partNumber,'Steve J')  or contains(description,'Steve J')  or contains(priority,'Steve J')  or contains(subIssueType,'Steve J')  or contains(outTrackingNumber,'Steve J')  or contains(outShipStatus,'Steve J')  or contains(shiptoAddress->>'city','Steve J')  or contains(shiptoAddress->>'state','Steve J')  or contains(shiptoAddress->>'email','Steve J')  or contains(shiptoAddress->>'name','Steve J')  or contains(shiptoAddress->>'postalCode','Steve J')  or contains(shiptoAddress->>'street','Steve J')  or contains(shiptoAddress->>'country','Steve J')  or contains(bmsticket__status,'Steve J')  or contains(orderReason,'Steve J')  or contains(primaryAssignee,'Steve J')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_3", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Steve Jo') or contains(ticketNumber,'Steve Jo')  or contains(orderId,'Steve Jo')  or contains(accountName,'Steve Jo')  or contains(name,'Steve Jo')  or contains(partNumber,'Steve Jo')  or contains(description,'Steve Jo')  or contains(priority,'Steve Jo')  or contains(subIssueType,'Steve Jo')  or contains(outTrackingNumber,'Steve Jo')  or contains(outShipStatus,'Steve Jo')  or contains(shiptoAddress->>'city','Steve Jo')  or contains(shiptoAddress->>'state','Steve Jo')  or contains(shiptoAddress->>'email','Steve Jo')  or contains(shiptoAddress->>'name','Steve Jo')  or contains(shiptoAddress->>'postalCode','Steve Jo')  or contains(shiptoAddress->>'street','Steve Jo')  or contains(shiptoAddress->>'country','Steve Jo')  or contains(bmsticket__status,'Steve Jo')  or contains(orderReason,'Steve Jo')  or contains(primaryAssignee,'Steve Jo')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_4", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Steve Jop') or contains(ticketNumber,'Steve Jop')  or contains(orderId,'Steve Jop')  or contains(accountName,'Steve Jop')  or contains(name,'Steve Jop')  or contains(partNumber,'Steve Jop')  or contains(description,'Steve Jop')  or contains(priority,'Steve Jop')  or contains(subIssueType,'Steve Jop')  or contains(outTrackingNumber,'Steve Jop')  or contains(outShipStatus,'Steve Jop')  or contains(shiptoAddress->>'city','Steve Jop')  or contains(shiptoAddress->>'state','Steve Jop')  or contains(shiptoAddress->>'email','Steve Jop')  or contains(shiptoAddress->>'name','Steve Jop')  or contains(shiptoAddress->>'postalCode','Steve Jop')  or contains(shiptoAddress->>'street','Steve Jop')  or contains(shiptoAddress->>'country','Steve Jop')  or contains(bmsticket__status,'Steve Jop')  or contains(orderReason,'Steve Jop')  or contains(primaryAssignee,'Steve Jop')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_5", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Steve Jopli') or contains(ticketNumber,'Steve Jopli')  or contains(orderId,'Steve Jopli')  or contains(accountName,'Steve Jopli')  or contains(name,'Steve Jopli')  or contains(partNumber,'Steve Jopli')  or contains(description,'Steve Jopli')  or contains(priority,'Steve Jopli')  or contains(subIssueType,'Steve Jopli')  or contains(outTrackingNumber,'Steve Jopli')  or contains(outShipStatus,'Steve Jopli')  or contains(shiptoAddress->>'city','Steve Jopli')  or contains(shiptoAddress->>'state','Steve Jopli')  or contains(shiptoAddress->>'email','Steve Jopli')  or contains(shiptoAddress->>'name','Steve Jopli')  or contains(shiptoAddress->>'postalCode','Steve Jopli')  or contains(shiptoAddress->>'street','Steve Jopli')  or contains(shiptoAddress->>'country','Steve Jopli')  or contains(bmsticket__status,'Steve Jopli')  or contains(orderReason,'Steve Jopli')  or contains(primaryAssignee,'Steve Jopli')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_6", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Steve Joplin') or contains(ticketNumber,'Steve Joplin')  or contains(orderId,'Steve Joplin')  or contains(accountName,'Steve Joplin')  or contains(name,'Steve Joplin')  or contains(partNumber,'Steve Joplin')  or contains(description,'Steve Joplin')  or contains(priority,'Steve Joplin')  or contains(subIssueType,'Steve Joplin')  or contains(outTrackingNumber,'Steve Joplin')  or contains(outShipStatus,'Steve Joplin')  or contains(shiptoAddress->>'city','Steve Joplin')  or contains(shiptoAddress->>'state','Steve Joplin')  or contains(shiptoAddress->>'email','Steve Joplin')  or contains(shiptoAddress->>'name','Steve Joplin')  or contains(shiptoAddress->>'postalCode','Steve Joplin')  or contains(shiptoAddress->>'street','Steve Joplin')  or contains(shiptoAddress->>'country','Steve Joplin')  or contains(bmsticket__status,'Steve Joplin')  or contains(orderReason,'Steve Joplin')  or contains(primaryAssignee,'Steve Joplin')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_7", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve jop') or contains(ticketNumber,'steve jop')  or contains(orderId,'steve jop')  or contains(accountName,'steve jop')  or contains(name,'steve jop')  or contains(partNumber,'steve jop')  or contains(description,'steve jop')  or contains(priority,'steve jop')  or contains(subIssueType,'steve jop')  or contains(outTrackingNumber,'steve jop')  or contains(outShipStatus,'steve jop')  or contains(shiptoAddress->>'city','steve jop')  or contains(shiptoAddress->>'state','steve jop')  or contains(shiptoAddress->>'email','steve jop')  or contains(shiptoAddress->>'name','steve jop')  or contains(shiptoAddress->>'postalCode','steve jop')  or contains(shiptoAddress->>'street','steve jop')  or contains(shiptoAddress->>'country','steve jop')  or contains(bmsticket__status,'steve jop')  or contains(orderReason,'steve jop')  or contains(primaryAssignee,'steve jop')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_8", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve jo') or contains(ticketNumber,'steve jo')  or contains(orderId,'steve jo')  or contains(accountName,'steve jo')  or contains(name,'steve jo')  or contains(partNumber,'steve jo')  or contains(description,'steve jo')  or contains(priority,'steve jo')  or contains(subIssueType,'steve jo')  or contains(outTrackingNumber,'steve jo')  or contains(outShipStatus,'steve jo')  or contains(shiptoAddress->>'city','steve jo')  or contains(shiptoAddress->>'state','steve jo')  or contains(shiptoAddress->>'email','steve jo')  or contains(shiptoAddress->>'name','steve jo')  or contains(shiptoAddress->>'postalCode','steve jo')  or contains(shiptoAddress->>'street','steve jo')  or contains(shiptoAddress->>'country','steve jo')  or contains(bmsticket__status,'steve jo')  or contains(orderReason,'steve jo')  or contains(primaryAssignee,'steve jo')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_9", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve job') or contains(ticketNumber,'steve job')  or contains(orderId,'steve job')  or contains(accountName,'steve job')  or contains(name,'steve job')  or contains(partNumber,'steve job')  or contains(description,'steve job')  or contains(priority,'steve job')  or contains(subIssueType,'steve job')  or contains(outTrackingNumber,'steve job')  or contains(outShipStatus,'steve job')  or contains(shiptoAddress->>'city','steve job')  or contains(shiptoAddress->>'state','steve job')  or contains(shiptoAddress->>'email','steve job')  or contains(shiptoAddress->>'name','steve job')  or contains(shiptoAddress->>'postalCode','steve job')  or contains(shiptoAddress->>'street','steve job')  or contains(shiptoAddress->>'country','steve job')  or contains(bmsticket__status,'steve job')  or contains(orderReason,'steve job')  or contains(primaryAssignee,'steve job')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_10", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve j') or contains(ticketNumber,'steve j')  or contains(orderId,'steve j')  or contains(accountName,'steve j')  or contains(name,'steve j')  or contains(partNumber,'steve j')  or contains(description,'steve j')  or contains(priority,'steve j')  or contains(subIssueType,'steve j')  or contains(outTrackingNumber,'steve j')  or contains(outShipStatus,'steve j')  or contains(shiptoAddress->>'city','steve j')  or contains(shiptoAddress->>'state','steve j')  or contains(shiptoAddress->>'email','steve j')  or contains(shiptoAddress->>'name','steve j')  or contains(shiptoAddress->>'postalCode','steve j')  or contains(shiptoAddress->>'street','steve j')  or contains(shiptoAddress->>'country','steve j')  or contains(bmsticket__status,'steve j')  or contains(orderReason,'steve j')  or contains(primaryAssignee,'steve j')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_11", () => {
        var parser = new Parser();
        let query = "(contains(bmsticketorder__meta->>'selectedBinLoc', 'srjoplin@gmail.com>') or contains(ticketNumber,'srjoplin@gmail.com>')  or contains(orderId,'srjoplin@gmail.com>')  or contains(accountName,'srjoplin@gmail.com>')  or contains(name,'srjoplin@gmail.com>')  or contains(partNumber,'srjoplin@gmail.com>')  or contains(description,'srjoplin@gmail.com>')  or contains(priority,'srjoplin@gmail.com>')  or contains(subIssueType,'srjoplin@gmail.com>')  or contains(outTrackingNumber,'srjoplin@gmail.com>')  or contains(outShipStatus,'srjoplin@gmail.com>')  or contains(shiptoAddress->>'city','srjoplin@gmail.com>')  or contains(shiptoAddress->>'state','srjoplin@gmail.com>')  or contains(shiptoAddress->>'email','srjoplin@gmail.com>')  or contains(shiptoAddress->>'name','srjoplin@gmail.com>')  or contains(shiptoAddress->>'postalCode','srjoplin@gmail.com>')  or contains(shiptoAddress->>'street','srjoplin@gmail.com>')  or contains(shiptoAddress->>'country','srjoplin@gmail.com>')  or contains(bmsticket__status,'srjoplin@gmail.com>')  or contains(orderReason,'srjoplin@gmail.com>')  or contains(primaryAssignee,'srjoplin@gmail.com>'))";
        //query = query.replace(">'","'");
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
        expect(ast.raw == filter).to.be.true;
        
      });
    
      it("order_sample_12", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'srsrjoplin@gmail.com>') or contains(ticketNumber,'srsrjoplin@gmail.com>')  or contains(orderId,'srsrjoplin@gmail.com>')  or contains(accountName,'srsrjoplin@gmail.com>')  or contains(name,'srsrjoplin@gmail.com>')  or contains(partNumber,'srsrjoplin@gmail.com>')  or contains(description,'srsrjoplin@gmail.com>')  or contains(priority,'srsrjoplin@gmail.com>')  or contains(subIssueType,'srsrjoplin@gmail.com>')  or contains(outTrackingNumber,'srsrjoplin@gmail.com>')  or contains(outShipStatus,'srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'city','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'state','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'email','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'name','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'postalCode','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'street','srsrjoplin@gmail.com>')  or contains(shiptoAddress->>'country','srsrjoplin@gmail.com>')  or contains(bmsticket__status,'srsrjoplin@gmail.com>')  or contains(orderReason,'srsrjoplin@gmail.com>')  or contains(primaryAssignee,'srsrjoplin@gmail.com>')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
        expect(ast.raw == filter).to.be.true;
        console.log(ast.filter);
      });
    
      it("order_sample_13", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'srjsrjoplin@gmail.com>') or contains(ticketNumber,'srjsrjoplin@gmail.com>')  or contains(orderId,'srjsrjoplin@gmail.com>')  or contains(accountName,'srjsrjoplin@gmail.com>')  or contains(name,'srjsrjoplin@gmail.com>')  or contains(partNumber,'srjsrjoplin@gmail.com>')  or contains(description,'srjsrjoplin@gmail.com>')  or contains(priority,'srjsrjoplin@gmail.com>')  or contains(subIssueType,'srjsrjoplin@gmail.com>')  or contains(outTrackingNumber,'srjsrjoplin@gmail.com>')  or contains(outShipStatus,'srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'city','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'state','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'email','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'name','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'postalCode','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'street','srjsrjoplin@gmail.com>')  or contains(shiptoAddress->>'country','srjsrjoplin@gmail.com>')  or contains(bmsticket__status,'srjsrjoplin@gmail.com>')  or contains(orderReason,'srjsrjoplin@gmail.com>')  or contains(primaryAssignee,'srjsrjoplin@gmail.com>')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
        expect(ast.raw == filter).to.be.true;
      });

    
      it("order_sample_14", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve jo') or contains(ticketNumber,'steve jo')  or contains(orderId,'steve jo')  or contains(accountName,'steve jo')  or contains(name,'steve jo')  or contains(partNumber,'steve jo')  or contains(description,'steve jo')  or contains(priority,'steve jo')  or contains(subIssueType,'steve jo')  or contains(outTrackingNumber,'steve jo')  or contains(outShipStatus,'steve jo')  or contains(shiptoAddress->>'city','steve jo')  or contains(shiptoAddress->>'state','steve jo')  or contains(shiptoAddress->>'email','steve jo')  or contains(shiptoAddress->>'name','steve jo')  or contains(shiptoAddress->>'postalCode','steve jo')  or contains(shiptoAddress->>'street','steve jo')  or contains(shiptoAddress->>'country','steve jo')  or contains(bmsticket__status,'steve jo')  or contains(orderReason,'steve jo')  or contains(primaryAssignee,'steve jo')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
        expect(ast.raw == filter).to.be.true;
      });
    
      it("order_sample_15", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve job') or contains(ticketNumber,'steve job')  or contains(orderId,'steve job')  or contains(accountName,'steve job')  or contains(name,'steve job')  or contains(partNumber,'steve job')  or contains(description,'steve job')  or contains(priority,'steve job')  or contains(subIssueType,'steve job')  or contains(outTrackingNumber,'steve job')  or contains(outShipStatus,'steve job')  or contains(shiptoAddress->>'city','steve job')  or contains(shiptoAddress->>'state','steve job')  or contains(shiptoAddress->>'email','steve job')  or contains(shiptoAddress->>'name','steve job')  or contains(shiptoAddress->>'postalCode','steve job')  or contains(shiptoAddress->>'street','steve job')  or contains(shiptoAddress->>'country','steve job')  or contains(bmsticket__status,'steve job')  or contains(orderReason,'steve job')  or contains(primaryAssignee,'steve job')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
        expect(ast.raw == filter).to.be.true;
      });
    
      it("order_sample_16", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'steve j') or contains(ticketNumber,'steve j')  or contains(orderId,'steve j')  or contains(accountName,'steve j')  or contains(name,'steve j')  or contains(partNumber,'steve j')  or contains(description,'steve j')  or contains(priority,'steve j')  or contains(subIssueType,'steve j')  or contains(outTrackingNumber,'steve j')  or contains(outShipStatus,'steve j')  or contains(shiptoAddress->>'city','steve j')  or contains(shiptoAddress->>'state','steve j')  or contains(shiptoAddress->>'email','steve j')  or contains(shiptoAddress->>'name','steve j')  or contains(shiptoAddress->>'postalCode','steve j')  or contains(shiptoAddress->>'street','steve j')  or contains(shiptoAddress->>'country','steve j')  or contains(bmsticket__status,'steve j')  or contains(orderReason,'steve j')  or contains(primaryAssignee,'steve j')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_17", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'srjoplin@gmail.com srjoplin@gmail.com>') or contains(ticketNumber,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(orderId,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(accountName,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(name,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(partNumber,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(description,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(priority,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(subIssueType,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(outTrackingNumber,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(outShipStatus,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'city','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'state','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'email','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'name','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'postalCode','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'street','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(shiptoAddress->>'country','srjoplin@gmail.com srjoplin@gmail.com>')  or contains(bmsticket__status,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(orderReason,'srjoplin@gmail.com srjoplin@gmail.com>')  or contains(primaryAssignee,'srjoplin@gmail.com srjoplin@gmail.com>')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_18", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'LEOR GILLERMAN') or contains(ticketNumber,'LEOR GILLERMAN')  or contains(orderId,'LEOR GILLERMAN')  or contains(accountName,'LEOR GILLERMAN')  or contains(name,'LEOR GILLERMAN')  or contains(partNumber,'LEOR GILLERMAN')  or contains(description,'LEOR GILLERMAN')  or contains(priority,'LEOR GILLERMAN')  or contains(subIssueType,'LEOR GILLERMAN')  or contains(outTrackingNumber,'LEOR GILLERMAN')  or contains(outShipStatus,'LEOR GILLERMAN')  or contains(shiptoAddress->>'city','LEOR GILLERMAN')  or contains(shiptoAddress->>'state','LEOR GILLERMAN')  or contains(shiptoAddress->>'email','LEOR GILLERMAN')  or contains(shiptoAddress->>'name','LEOR GILLERMAN')  or contains(shiptoAddress->>'postalCode','LEOR GILLERMAN')  or contains(shiptoAddress->>'street','LEOR GILLERMAN')  or contains(shiptoAddress->>'country','LEOR GILLERMAN')  or contains(bmsticket__status,'LEOR GILLERMAN')  or contains(orderReason,'LEOR GILLERMAN')  or contains(primaryAssignee,'LEOR GILLERMAN')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    
      it("order_sample_19", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'Lisa Della Santina Wilsey') or contains(ticketNumber,'Lisa Della Santina Wilsey')  or contains(orderId,'Lisa Della Santina Wilsey')  or contains(accountName,'Lisa Della Santina Wilsey')  or contains(name,'Lisa Della Santina Wilsey')  or contains(partNumber,'Lisa Della Santina Wilsey')  or contains(description,'Lisa Della Santina Wilsey')  or contains(priority,'Lisa Della Santina Wilsey')  or contains(subIssueType,'Lisa Della Santina Wilsey')  or contains(outTrackingNumber,'Lisa Della Santina Wilsey')  or contains(outShipStatus,'Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'city','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'state','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'email','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'name','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'postalCode','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'street','Lisa Della Santina Wilsey')  or contains(shiptoAddress->>'country','Lisa Della Santina Wilsey')  or contains(bmsticket__status,'Lisa Della Santina Wilsey')  or contains(orderReason,'Lisa Della Santina Wilsey')  or contains(primaryAssignee,'Lisa Della Santina Wilsey')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
      it("order_sample_20", () => {
        let query = "(bmsticket__status ne 'Completed' and bmsticket__status ne 'Cancelled') and ( contains(bmsticketorder__meta->>'selectedBinLoc', 'Abraham S') or contains(ticketNumber,'Abraham S')  or contains(orderId,'Abraham S')  or contains(accountName,'Abraham S')  or contains(name,'Abraham S')  or contains(partNumber,'Abraham S')  or contains(description,'Abraham S')  or contains(priority,'Abraham S')  or contains(subIssueType,'Abraham S')  or contains(outTrackingNumber,'Abraham S')  or contains(outShipStatus,'Abraham S')  or contains(shiptoAddress->>'city','Abraham S')  or contains(shiptoAddress->>'state','Abraham S')  or contains(shiptoAddress->>'email','Abraham S')  or contains(shiptoAddress->>'name','Abraham S')  or contains(shiptoAddress->>'postalCode','Abraham S')  or contains(shiptoAddress->>'street','Abraham S')  or contains(shiptoAddress->>'country','Abraham S')  or contains(bmsticket__status,'Abraham S')  or contains(orderReason,'Abraham S')  or contains(primaryAssignee,'Abraham S')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
      it("order_sample_21", () => {
        let query = "( contains(bmsticketorder__meta->>'selectedBinLoc', 'Frank Dechellis') or contains(ticketNumber,'Frank Dechellis')  or contains(orderId,'Frank Dechellis')  or contains(accountName,'Frank Dechellis')  or contains(name,'Frank Dechellis')  or contains(partNumber,'Frank Dechellis')  or contains(description,'Frank Dechellis')  or contains(priority,'Frank Dechellis')  or contains(subIssueType,'Frank Dechellis')  or contains(outTrackingNumber,'Frank Dechellis')  or contains(outShipStatus,'Frank Dechellis')  or contains(shiptoAddress->>'city','Frank Dechellis')  or contains(shiptoAddress->>'state','Frank Dechellis')  or contains(shiptoAddress->>'email','Frank Dechellis')  or contains(shiptoAddress->>'name','Frank Dechellis')  or contains(shiptoAddress->>'postalCode','Frank Dechellis')  or contains(shiptoAddress->>'street','Frank Dechellis')  or contains(shiptoAddress->>'country','Frank Dechellis')  or contains(bmsticket__status,'Frank Dechellis')  or contains(orderReason,'Frank Dechellis')  or contains(primaryAssignee,'Frank Dechellis')  )";
        var parser = new Parser();
        let filter = `$filter=${query}`;
        var ast = parser.query(filter); 
      });
    


});




