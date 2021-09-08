"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePath = void 0;
const utils_1 = require("./utils");
const lexer_1 = require("./lexer");
const primitiveLiteral_1 = require("./primitiveLiteral");
const nameOrIdentifier_1 = require("./nameOrIdentifier");
const expressions_1 = require("./expressions");
var ResourcePath;
(function (ResourcePath) {
    function resourcePath(value, index, metadataContext) {
        if (value[index] === 0x2f)
            index++;
        let token = ResourcePath.batch(value, index) ||
            ResourcePath.entity(value, index, metadataContext) ||
            ResourcePath.metadata(value, index);
        if (token)
            return token;
        let resource = nameOrIdentifier_1.default.entitySetName(value, index, metadataContext) ||
            ResourcePath.functionImportCall(value, index, metadataContext) ||
            ResourcePath.crossjoin(value, index) ||
            ResourcePath.all(value, index) ||
            ResourcePath.actionImportCall(value, index, metadataContext) ||
            nameOrIdentifier_1.default.singletonEntity(value, index);
        if (!resource)
            return;
        let start = index;
        index = resource.next;
        let navigation;
        switch (resource.type) {
            case lexer_1.default.TokenType.EntitySetName:
                navigation = ResourcePath.collectionNavigation(value, resource.next, resource.metadata);
                metadataContext = resource.metadata;
                delete resource.metadata;
                break;
            case lexer_1.default.TokenType.EntityCollectionFunctionImportCall:
                navigation = ResourcePath.collectionNavigation(value, resource.next, resource.value.import.metadata);
                metadataContext = resource.value.import.metadata;
                delete resource.value.import.metadata;
                break;
            case lexer_1.default.TokenType.SingletonEntity:
                navigation = ResourcePath.singleNavigation(value, resource.next, resource.metadata);
                metadataContext = resource.metadata;
                delete resource.metadata;
                break;
            case lexer_1.default.TokenType.EntityFunctionImportCall:
                navigation = ResourcePath.singleNavigation(value, resource.next, resource.value.import.metadata);
                metadataContext = resource.value.import.metadata;
                delete resource.value.import.metadata;
                break;
            case lexer_1.default.TokenType.ComplexCollectionFunctionImportCall:
            case lexer_1.default.TokenType.PrimitiveCollectionFunctionImportCall:
                navigation = ResourcePath.collectionPath(value, resource.next, resource.value.import.metadata);
                metadataContext = resource.value.import.metadata;
                delete resource.value.import.metadata;
                break;
            case lexer_1.default.TokenType.ComplexFunctionImportCall:
                navigation = ResourcePath.complexPath(value, resource.next, resource.value.import.metadata);
                metadataContext = resource.value.import.metadata;
                delete resource.value.import.metadata;
                break;
            case lexer_1.default.TokenType.PrimitiveFunctionImportCall:
                navigation = ResourcePath.singlePath(value, resource.next, resource.value.import.metadata);
                metadataContext = resource.value.import.metadata;
                delete resource.value.import.metadata;
                break;
        }
        if (navigation)
            index = navigation.next;
        if (value[index] === 0x2f)
            index++;
        if (resource)
            return lexer_1.default.tokenize(value, start, index, { resource, navigation }, lexer_1.default.TokenType.ResourcePath, navigation || { metadata: metadataContext });
    }
    ResourcePath.resourcePath = resourcePath;
    function batch(value, index) {
        if (utils_1.default.equals(value, index, "$batch"))
            return lexer_1.default.tokenize(value, index, index + 6, "$batch", lexer_1.default.TokenType.Batch);
    }
    ResourcePath.batch = batch;
    function entity(value, index, metadataContext) {
        if (utils_1.default.equals(value, index, "$entity")) {
            let start = index;
            index += 7;
            let name;
            if (value[index] === 0x2f) {
                name = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index + 1, metadataContext);
                if (!name)
                    return;
                index = name.next;
            }
            return lexer_1.default.tokenize(value, start, index, name || "$entity", lexer_1.default.TokenType.Entity);
        }
    }
    ResourcePath.entity = entity;
    function metadata(value, index) {
        if (utils_1.default.equals(value, index, "$metadata"))
            return lexer_1.default.tokenize(value, index, index + 9, "$metadata", lexer_1.default.TokenType.Metadata);
    }
    ResourcePath.metadata = metadata;
    function collectionNavigation(value, index, metadataContext) {
        let start = index;
        let name;
        if (value[index] === 0x2f) {
            name = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index + 1, metadataContext);
            if (name) {
                index = name.next;
                metadataContext = name.value.metadata;
                delete name.value.metadata;
            }
        }
        let path = ResourcePath.collectionNavigationPath(value, index, metadataContext);
        if (path)
            index = path.next;
        if (!name && !path)
            return;
        return lexer_1.default.tokenize(value, start, index, { name, path }, lexer_1.default.TokenType.CollectionNavigation, path || name);
    }
    ResourcePath.collectionNavigation = collectionNavigation;
    function collectionNavigationPath(value, index, metadataContext) {
        let start = index;
        let token = ResourcePath.collectionPath(value, index, metadataContext) ||
            expressions_1.default.refExpr(value, index);
        if (token)
            return token;
        let predicate = expressions_1.default.keyPredicate(value, index, metadataContext);
        if (predicate) {
            let tokenValue = { predicate };
            index = predicate.next;
            let navigation = ResourcePath.singleNavigation(value, index, metadataContext);
            if (navigation) {
                tokenValue = { predicate, navigation };
                index = navigation.next;
            }
            return lexer_1.default.tokenize(value, start, index, tokenValue, lexer_1.default.TokenType.CollectionNavigationPath, navigation || { metadata: metadataContext });
        }
    }
    ResourcePath.collectionNavigationPath = collectionNavigationPath;
    function singleNavigation(value, index, metadataContext) {
        let token = ResourcePath.boundOperation(value, index, false, metadataContext) ||
            expressions_1.default.refExpr(value, index) ||
            expressions_1.default.valueExpr(value, index);
        if (token)
            return token;
        let start = index;
        let name;
        if (value[index] === 0x2f) {
            name = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index + 1, metadataContext);
            if (name) {
                index = name.next;
                metadataContext = name.value.metadata;
                delete name.value.metadata;
            }
        }
        if (value[index] === 0x2f) {
            token = ResourcePath.propertyPath(value, index + 1, metadataContext);
            if (token)
                index = token.next;
        }
        if (!name && !token)
            return;
        return lexer_1.default.tokenize(value, start, index, { name: name, path: token }, lexer_1.default.TokenType.SingleNavigation, token);
    }
    ResourcePath.singleNavigation = singleNavigation;
    function propertyPath(value, index, metadataContext) {
        let token = nameOrIdentifier_1.default.entityColNavigationProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.entityNavigationProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.complexColProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.complexProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.primitiveColProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.primitiveProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.streamProperty(value, index, metadataContext);
        if (!token)
            return;
        let start = index;
        index = token.next;
        let navigation;
        switch (token.type) {
            case lexer_1.default.TokenType.EntityCollectionNavigationProperty:
                navigation = ResourcePath.collectionNavigation(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.EntityNavigationProperty:
                navigation = ResourcePath.singleNavigation(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.ComplexCollectionProperty:
                navigation = ResourcePath.collectionPath(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.ComplexProperty:
                navigation = ResourcePath.complexPath(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.PrimitiveCollectionProperty:
                navigation = ResourcePath.collectionPath(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.PrimitiveKeyProperty:
            case lexer_1.default.TokenType.PrimitiveProperty:
                navigation = ResourcePath.singlePath(value, index, token.metadata);
                delete token.metadata;
                break;
            case lexer_1.default.TokenType.StreamProperty:
                navigation = ResourcePath.boundOperation(value, index, token.metadata);
                delete token.metadata;
                break;
        }
        if (navigation)
            index = navigation.next;
        return lexer_1.default.tokenize(value, start, index, { path: token, navigation }, lexer_1.default.TokenType.PropertyPath, navigation);
    }
    ResourcePath.propertyPath = propertyPath;
    function collectionPath(value, index, metadataContext) {
        return expressions_1.default.countExpr(value, index) ||
            ResourcePath.boundOperation(value, index, true, metadataContext);
    }
    ResourcePath.collectionPath = collectionPath;
    function singlePath(value, index, metadataContext) {
        return expressions_1.default.valueExpr(value, index) ||
            ResourcePath.boundOperation(value, index, false, metadataContext);
    }
    ResourcePath.singlePath = singlePath;
    function complexPath(value, index, metadataContext) {
        let start = index;
        let name, token;
        if (value[index] === 0x2f) {
            name = nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index + 1, metadataContext);
            if (name)
                index = name.next;
        }
        if (value[index] === 0x2f) {
            token = ResourcePath.propertyPath(value, index + 1, metadataContext);
            if (!token)
                return;
            index = token.next;
        }
        else
            token = ResourcePath.boundOperation(value, index, false, metadataContext);
        if (!name && !token)
            return;
        return lexer_1.default.tokenize(value, start, index, { name: name, path: token }, lexer_1.default.TokenType.ComplexPath, token);
    }
    ResourcePath.complexPath = complexPath;
    function boundOperation(value, index, isCollection, metadataContext) {
        if (value[index] !== 0x2f)
            return;
        let start = index;
        index++;
        let operation = ResourcePath.boundEntityColFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundEntityFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundComplexColFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundComplexFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundPrimitiveColFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundPrimitiveFuncCall(value, index, isCollection, metadataContext) ||
            ResourcePath.boundActionCall(value, index, isCollection, metadataContext);
        if (!operation)
            return;
        index = operation.next;
        let name, navigation;
        switch (operation.type) {
            case lexer_1.default.TokenType.BoundActionCall:
                break;
            case lexer_1.default.TokenType.BoundEntityCollectionFunctionCall:
                navigation = ResourcePath.collectionNavigation(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
            case lexer_1.default.TokenType.BoundEntityFunctionCall:
                navigation = ResourcePath.singleNavigation(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
            case lexer_1.default.TokenType.BoundComplexCollectionFunctionCall:
                if (value[index] === 0x2f) {
                    name = nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index + 1, operation.value.call.metadata);
                    if (name)
                        index = name.next;
                }
                navigation = ResourcePath.collectionPath(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
            case lexer_1.default.TokenType.BoundComplexFunctionCall:
                navigation = ResourcePath.complexPath(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
            case lexer_1.default.TokenType.BoundPrimitiveCollectionFunctionCall:
                navigation = ResourcePath.collectionPath(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
            case lexer_1.default.TokenType.BoundPrimitiveFunctionCall:
                navigation = ResourcePath.singlePath(value, index, operation.value.call.metadata);
                delete operation.metadata;
                break;
        }
        if (navigation)
            index = navigation.next;
        return lexer_1.default.tokenize(value, start, index, { operation, name, navigation }, lexer_1.default.TokenType.BoundOperation, navigation);
    }
    ResourcePath.boundOperation = boundOperation;
    function boundActionCall(value, index, isCollection, metadataContext) {
        let namespaceNext = nameOrIdentifier_1.default.namespace(value, index);
        if (namespaceNext === index)
            return;
        let start = index;
        index = namespaceNext;
        if (value[index] !== 0x2e)
            return;
        index++;
        let action = nameOrIdentifier_1.default.action(value, index, isCollection, metadataContext);
        if (!action)
            return;
        action.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        return lexer_1.default.tokenize(value, start, action.next, action, lexer_1.default.TokenType.BoundActionCall, action);
    }
    ResourcePath.boundActionCall = boundActionCall;
    function boundFunctionCall(value, index, odataFunction, tokenType, isCollection, metadataContext) {
        let namespaceNext = nameOrIdentifier_1.default.namespace(value, index);
        if (namespaceNext === index)
            return;
        let start = index;
        index = namespaceNext;
        if (value[index] !== 0x2e)
            return;
        index++;
        let call = odataFunction(value, index, isCollection, metadataContext);
        if (!call)
            return;
        call.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        index = call.next;
        let params = ResourcePath.functionParameters(value, index);
        if (!params)
            return;
        index = params.next;
        return lexer_1.default.tokenize(value, start, index, { call, params }, tokenType, call);
    }
    ResourcePath.boundFunctionCall = boundFunctionCall;
    function boundEntityFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.entityFunction, lexer_1.default.TokenType.BoundEntityFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundEntityFuncCall = boundEntityFuncCall;
    function boundEntityColFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.entityColFunction, lexer_1.default.TokenType.BoundEntityCollectionFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundEntityColFuncCall = boundEntityColFuncCall;
    function boundComplexFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.complexFunction, lexer_1.default.TokenType.BoundComplexFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundComplexFuncCall = boundComplexFuncCall;
    function boundComplexColFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.complexColFunction, lexer_1.default.TokenType.BoundComplexCollectionFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundComplexColFuncCall = boundComplexColFuncCall;
    function boundPrimitiveFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.primitiveFunction, lexer_1.default.TokenType.BoundPrimitiveFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundPrimitiveFuncCall = boundPrimitiveFuncCall;
    function boundPrimitiveColFuncCall(value, index, isCollection, metadataContext) {
        return ResourcePath.boundFunctionCall(value, index, nameOrIdentifier_1.default.primitiveColFunction, lexer_1.default.TokenType.BoundPrimitiveCollectionFunctionCall, isCollection, metadataContext);
    }
    ResourcePath.boundPrimitiveColFuncCall = boundPrimitiveColFuncCall;
    function actionImportCall(value, index, metadataContext) {
        let action = nameOrIdentifier_1.default.actionImport(value, index, metadataContext);
        if (action)
            return lexer_1.default.tokenize(value, index, action.next, action, lexer_1.default.TokenType.ActionImportCall, action);
    }
    ResourcePath.actionImportCall = actionImportCall;
    function functionImportCall(value, index, metadataContext) {
        let fnImport = nameOrIdentifier_1.default.entityFunctionImport(value, index, metadataContext) ||
            nameOrIdentifier_1.default.entityColFunctionImport(value, index, metadataContext) ||
            nameOrIdentifier_1.default.complexFunctionImport(value, index, metadataContext) ||
            nameOrIdentifier_1.default.complexColFunctionImport(value, index, metadataContext) ||
            nameOrIdentifier_1.default.primitiveFunctionImport(value, index, metadataContext) ||
            nameOrIdentifier_1.default.primitiveColFunctionImport(value, index, metadataContext);
        if (!fnImport)
            return;
        let start = index;
        index = fnImport.next;
        let params = ResourcePath.functionParameters(value, index);
        if (!params)
            return;
        index = params.next;
        return lexer_1.default.tokenize(value, start, index, { import: fnImport, params: params.value }, (fnImport.type + "Call"), fnImport);
    }
    ResourcePath.functionImportCall = functionImportCall;
    function functionParameters(value, index, metadataContext) {
        let open = lexer_1.default.OPEN(value, index);
        if (!open)
            return;
        let start = index;
        index = open;
        let params = [];
        let token = ResourcePath.functionParameter(value, index);
        while (token) {
            params.push(token);
            index = token.next;
            let comma = lexer_1.default.COMMA(value, index);
            if (comma) {
                index = comma;
                token = ResourcePath.functionParameter(value, index);
                if (!token)
                    return;
            }
            else
                break;
        }
        let close = lexer_1.default.CLOSE(value, index);
        if (!close)
            return;
        index = close;
        return lexer_1.default.tokenize(value, start, index, params, lexer_1.default.TokenType.FunctionParameters);
    }
    ResourcePath.functionParameters = functionParameters;
    function functionParameter(value, index, metadataContext) {
        let name = expressions_1.default.parameterName(value, index);
        if (!name)
            return;
        let start = index;
        index = name.next;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let token = expressions_1.default.parameterAlias(value, index) ||
            primitiveLiteral_1.default.primitiveLiteral(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, { name, value: token }, lexer_1.default.TokenType.FunctionParameter);
    }
    ResourcePath.functionParameter = functionParameter;
    function crossjoin(value, index, metadataContext) {
        if (!utils_1.default.equals(value, index, "$crossjoin"))
            return;
        let start = index;
        index += 10;
        let open = lexer_1.default.OPEN(value, index);
        if (!open)
            return;
        index = open;
        let names = [];
        let token = nameOrIdentifier_1.default.entitySetName(value, index, metadataContext);
        if (!token)
            return;
        while (token) {
            names.push(token);
            index = token.next;
            let comma = lexer_1.default.COMMA(value, index);
            if (comma) {
                index = comma;
                token = nameOrIdentifier_1.default.entitySetName(value, index, metadataContext);
                if (!token)
                    return;
            }
            else
                break;
        }
        let close = lexer_1.default.CLOSE(value, index);
        if (!close)
            return;
        return lexer_1.default.tokenize(value, start, index, { names }, lexer_1.default.TokenType.Crossjoin);
    }
    ResourcePath.crossjoin = crossjoin;
    function all(value, index) {
        if (utils_1.default.equals(value, index, "$all"))
            return lexer_1.default.tokenize(value, index, index + 4, "$all", lexer_1.default.TokenType.AllResource);
    }
    ResourcePath.all = all;
})(ResourcePath = exports.ResourcePath || (exports.ResourcePath = {}));
exports.default = ResourcePath;
//# sourceMappingURL=resourcePath.js.map