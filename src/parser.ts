import Lexer from "./lexer";
import PrimitiveLiteral from "./primitiveLiteral";
import Expressions from "./expressions";
import Query from "./query";
import ResourcePath from "./resourcePath";
import ODataUri from "./odataUri";


export const parserFactory = function (fn) {
  return function (source, options) {
    options = options || {};
    source = (source || "").trim(); // ensure no trailing whitespace or newlines.
    // HACK - replace 'in (...)' with 'in [...]' so array parsing works
    const replacedSource = source.replace(/in \((.+)\)/g, "in [$1]");

    const raw = new Uint16Array(replacedSource.length);
    let pos = 0;
    for (let i = 0; i < replacedSource.length; i++) {
      raw[i] = replacedSource.charCodeAt(i);
    }
    let result = fn(raw, pos, options.metadata);
    if (!result) {
      throw new Error("Fail at " + pos);
    }
    if (result.next < raw.length) {
      console.log("Unexpected character at " + result.next + " " + String.fromCharCode(raw[result.next]));
      throw new Error("Unexpected character at " + result.next);
    }
    return result;
  };
};

export class Parser {
  odataUri(source: string, options?: any): Lexer.Token { return parserFactory(ODataUri.odataUri)(source, options); }
  resourcePath(source: string, options?: any): Lexer.Token { return parserFactory(ResourcePath.resourcePath)(source, options); }
  query(source: string, options?: any): Lexer.Token { return parserFactory(Query.queryOptions)(source, options); }
  filter(source: string, options?: any): Lexer.Token { return parserFactory(Expressions.boolCommonExpr)(source, options); }
  keys(source: string, options?: any): Lexer.Token { return parserFactory(Expressions.keyPredicate)(source, options); }
  literal(source: string, options?: any): Lexer.Token { return parserFactory(PrimitiveLiteral.primitiveLiteral)(source, options); }
}

export function odataUri(source: string, options?: any): Lexer.Token { return parserFactory(ODataUri.odataUri)(source, options); }
export function resourcePath(source: string, options?: any): Lexer.Token { return parserFactory(ResourcePath.resourcePath)(source, options); }
export function query(source: string, options?: any): Lexer.Token { return parserFactory(Query.queryOptions)(source, options); }
export function filter(source: string, options?: any): Lexer.Token { return parserFactory(Expressions.boolCommonExpr)(source, options); }
export function keys(source: string, options?: any): Lexer.Token { return parserFactory(Expressions.keyPredicate)(source, options); }
export function literal(source: string, options?: any): Lexer.Token { return parserFactory(PrimitiveLiteral.primitiveLiteral)(source, options); }