import Utils from "./utils";
import Lexer from "./lexer";
export declare namespace ResourcePath {
    function resourcePath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function batch(value: Utils.SourceArray, index: number): Lexer.Token;
    function entity(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function metadata(value: Utils.SourceArray, index: number): Lexer.Token;
    function collectionNavigation(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function collectionNavigationPath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function singleNavigation(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function propertyPath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function collectionPath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function singlePath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function complexPath(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function boundOperation(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundActionCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundFunctionCall(value: Utils.SourceArray, index: number, odataFunction: Function, tokenType: Lexer.TokenType, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundEntityFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundEntityColFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundComplexFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundComplexColFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundPrimitiveFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function boundPrimitiveColFuncCall(value: Utils.SourceArray, index: number, isCollection: boolean, metadataContext?: any): Lexer.Token;
    function actionImportCall(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function functionImportCall(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function functionParameters(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function functionParameter(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function crossjoin(value: Utils.SourceArray, index: number, metadataContext?: any): Lexer.Token;
    function all(value: Utils.SourceArray, index: number): Lexer.Token;
}
export default ResourcePath;