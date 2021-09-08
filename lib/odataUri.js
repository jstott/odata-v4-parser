"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ODataUri = void 0;
const lexer_1 = require("./lexer");
const query_1 = require("./query");
const resourcePath_1 = require("./resourcePath");
var ODataUri;
(function (ODataUri) {
    function odataUri(value, index, metadataContext) {
        let resource = resourcePath_1.default.resourcePath(value, index, metadataContext);
        while (!resource && index < value.length) {
            while (value[++index] !== 0x2f && index < value.length)
                ;
            resource = resourcePath_1.default.resourcePath(value, index, metadataContext);
        }
        if (!resource)
            return;
        let start = index;
        index = resource.next;
        metadataContext = resource.metadata;
        let query;
        if (value[index] === 0x3f) {
            query = query_1.default.queryOptions(value, index + 1, metadataContext);
            if (!query)
                return;
            index = query.next;
            delete resource.metadata;
        }
        return lexer_1.default.tokenize(value, start, index, { resource, query }, lexer_1.default.TokenType.ODataUri, { metadata: metadataContext });
    }
    ODataUri.odataUri = odataUri;
})(ODataUri = exports.ODataUri || (exports.ODataUri = {}));
exports.default = ODataUri;
//# sourceMappingURL=odataUri.js.map