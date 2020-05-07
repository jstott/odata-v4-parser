"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lexer_1 = require("./lexer");
const primitiveLiteral_1 = require("./primitiveLiteral");
const nameOrIdentifier_1 = require("./nameOrIdentifier");
const expressions_1 = require("./expressions");
var Query;
(function (Query) {
    function queryOptions(value, index, metadataContext) {
        let token = Query.queryOption(value, index, metadataContext);
        if (!token)
            return;
        let start = index;
        index = token.next;
        let options = [];
        while (token) {
            options.push(token);
            // &
            if (value[index] !== 0x26)
                break;
            index++;
            token = Query.queryOption(value, index, metadataContext);
            if (!token)
                return;
            index = token.next;
        }
        return lexer_1.default.tokenize(value, start, index, { options }, lexer_1.default.TokenType.QueryOptions);
    }
    Query.queryOptions = queryOptions;
    function queryOption(value, index, metadataContext) {
        return Query.systemQueryOption(value, index, metadataContext) ||
            Query.aliasAndValue(value, index) ||
            Query.customQueryOption(value, index);
    }
    Query.queryOption = queryOption;
    function systemQueryOption(value, index, metadataContext) {
        return Query.expand(value, index, metadataContext) ||
            Query.filter(value, index) ||
            Query.format(value, index) ||
            Query.id(value, index) ||
            Query.inlinecount(value, index) ||
            Query.orderby(value, index) ||
            Query.search(value, index) ||
            Query.select(value, index) ||
            Query.skip(value, index) ||
            Query.skiptoken(value, index) ||
            Query.top(value, index);
    }
    Query.systemQueryOption = systemQueryOption;
    function customQueryOption(value, index) {
        let key = nameOrIdentifier_1.default.odataIdentifier(value, index);
        if (!key)
            return;
        let start = index;
        index = key.next;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        while (value[index] !== 0x26 && index < value.length)
            index++;
        if (index === eq)
            return;
        return lexer_1.default.tokenize(value, start, index, { key: key.raw, value: utils_1.default.stringify(value, eq, index) }, lexer_1.default.TokenType.CustomQueryOption);
    }
    Query.customQueryOption = customQueryOption;
    function id(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24id")) {
            index += 5;
        }
        else if (utils_1.default.equals(value, index, "$id")) {
            index += 3;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        while (value[index] !== 0x26 && index < value.length)
            index++;
        if (index === eq)
            return;
        return lexer_1.default.tokenize(value, start, index, utils_1.default.stringify(value, eq, index), lexer_1.default.TokenType.Id);
    }
    Query.id = id;
    function expand(value, index, metadataContext) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24expand")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$expand")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let items = [];
        let token = Query.expandItem(value, index, metadataContext);
        if (!token)
            return;
        index = token.next;
        while (token) {
            items.push(token);
            let comma = lexer_1.default.COMMA(value, index);
            if (comma) {
                index = comma;
                token = Query.expandItem(value, index, metadataContext);
                if (!token)
                    return;
                index = token.next;
            }
            else
                break;
        }
        return lexer_1.default.tokenize(value, start, index, { items }, lexer_1.default.TokenType.Expand);
    }
    Query.expand = expand;
    function expandItem(value, index, metadataContext) {
        let start = index;
        let star = lexer_1.default.STAR(value, index);
        if (star) {
            index = star;
            let ref = expressions_1.default.refExpr(value, index);
            if (ref) {
                index = ref.next;
                return lexer_1.default.tokenize(value, start, index, { path: "*", ref }, lexer_1.default.TokenType.ExpandItem);
            }
            else {
                let open = lexer_1.default.OPEN(value, index);
                if (open) {
                    index = open;
                    let token = Query.levels(value, index);
                    if (!token)
                        return;
                    index = token.next;
                    let close = lexer_1.default.CLOSE(value, index);
                    if (!close)
                        return;
                    index = close;
                    return lexer_1.default.tokenize(value, start, index, { path: "*", levels: token }, lexer_1.default.TokenType.ExpandItem);
                }
            }
        }
        let path = Query.expandPath(value, index, metadataContext);
        if (!path)
            return;
        index = path.next;
        let tokenValue = { path };
        let ref = expressions_1.default.refExpr(value, index);
        if (ref) {
            index = ref.next;
            tokenValue.ref = ref;
            let open = lexer_1.default.OPEN(value, index);
            if (open) {
                index = open;
                let option = Query.expandRefOption(value, index);
                if (!option)
                    return;
                let refOptions = [];
                while (option) {
                    refOptions.push(option);
                    index = option.next;
                    let semi = lexer_1.default.SEMI(value, index);
                    if (semi) {
                        index = semi;
                        option = Query.expandRefOption(value, index);
                        if (!option)
                            return;
                    }
                    else
                        break;
                }
                let close = lexer_1.default.CLOSE(value, index);
                if (!close)
                    return;
                index = close;
                tokenValue.options = refOptions;
            }
        }
        else {
            let count = expressions_1.default.countExpr(value, index);
            if (count) {
                index = count.next;
                tokenValue.count = count;
                let open = lexer_1.default.OPEN(value, index);
                if (open) {
                    index = open;
                    let option = Query.expandCountOption(value, index);
                    if (!option)
                        return;
                    let countOptions = [];
                    while (option) {
                        countOptions.push(option);
                        index = option.next;
                        let semi = lexer_1.default.SEMI(value, index);
                        if (semi) {
                            index = semi;
                            option = Query.expandCountOption(value, index);
                            if (!option)
                                return;
                        }
                        else
                            break;
                    }
                    let close = lexer_1.default.CLOSE(value, index);
                    if (!close)
                        return;
                    index = close;
                    tokenValue.options = countOptions;
                }
            }
            else {
                let open = lexer_1.default.OPEN(value, index);
                if (open) {
                    index = open;
                    let option = Query.expandOption(value, index);
                    if (!option)
                        return;
                    let options = [];
                    while (option) {
                        options.push(option);
                        index = option.next;
                        let semi = lexer_1.default.SEMI(value, index);
                        if (semi) {
                            index = semi;
                            option = Query.expandOption(value, index);
                            if (!option)
                                return;
                        }
                        else
                            break;
                    }
                    let close = lexer_1.default.CLOSE(value, index);
                    if (!close)
                        return;
                    index = close;
                    tokenValue.options = options;
                }
            }
        }
        return lexer_1.default.tokenize(value, start, index, tokenValue, lexer_1.default.TokenType.ExpandItem);
    }
    Query.expandItem = expandItem;
    function expandCountOption(value, index) {
        return Query.filter(value, index) ||
            Query.search(value, index);
    }
    Query.expandCountOption = expandCountOption;
    function expandRefOption(value, index) {
        return Query.expandCountOption(value, index) ||
            Query.orderby(value, index) ||
            Query.skip(value, index) ||
            Query.top(value, index) ||
            Query.inlinecount(value, index);
    }
    Query.expandRefOption = expandRefOption;
    function expandOption(value, index) {
        return Query.expandRefOption(value, index) ||
            Query.select(value, index) ||
            Query.expand(value, index) ||
            Query.levels(value, index);
    }
    Query.expandOption = expandOption;
    function expandPath(value, index, metadataContext) {
        let start = index;
        let path = [];
        let token = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index, metadataContext) ||
            nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index, metadataContext);
        if (token) {
            index = token.next;
            path.push(token);
            if (value[index] !== 0x2f)
                return;
            index++;
            metadataContext = token.value.metadata;
            delete token.value.metadata;
        }
        let complex = nameOrIdentifier_1.default.complexProperty(value, index, metadataContext) ||
            nameOrIdentifier_1.default.complexColProperty(value, index, metadataContext);
        while (complex) {
            if (value[complex.next] === 0x2f) {
                index = complex.next + 1;
                path.push(complex);
                let complexTypeName = nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index, metadataContext);
                if (complexTypeName) {
                    if (value[complexTypeName.next] === 0x2f) {
                        index = complexTypeName.next + 1;
                        path.push(complexTypeName);
                    }
                    metadataContext = complexTypeName.value.metadata;
                    delete complexTypeName.value.metadata;
                }
                complex = nameOrIdentifier_1.default.complexProperty(value, index, metadataContext) ||
                    nameOrIdentifier_1.default.complexColProperty(value, index, metadataContext);
            }
            else
                break;
        }
        let nav = nameOrIdentifier_1.default.navigationProperty(value, index, metadataContext);
        if (!nav)
            return;
        index = nav.next;
        path.push(nav);
        metadataContext = nav.metadata;
        delete nav.metadata;
        if (value[index] === 0x2f) {
            let typeName = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index + 1, metadataContext);
            if (typeName) {
                index = typeName.next;
                path.push(typeName);
                metadataContext = typeName.value.metadata;
                delete typeName.value.metadata;
            }
        }
        return lexer_1.default.tokenize(value, start, index, path, lexer_1.default.TokenType.ExpandPath);
    }
    Query.expandPath = expandPath;
    function search(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24search")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$search")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let expr = Query.searchExpr(value, index);
        if (!expr)
            return;
        index = expr.next;
        return lexer_1.default.tokenize(value, start, index, expr, lexer_1.default.TokenType.Search);
    }
    Query.search = search;
    function searchExpr(value, index) {
        let token = Query.searchParenExpr(value, index) ||
            Query.searchTerm(value, index);
        if (!token)
            return;
        let start = index;
        index = token.next;
        let expr = Query.searchAndExpr(value, index) ||
            Query.searchOrExpr(value, index);
        if (expr) {
            const left = lexer_1.default.clone(token);
            token.next = expr.value.next;
            token.value = {
                left: left,
                right: expr.value
            };
            token.type = expr.type;
            token.raw = utils_1.default.stringify(value, token.position, token.next);
            if (token.type === lexer_1.default.TokenType.SearchAndExpression && token.value.right.type === lexer_1.default.TokenType.SearchOrExpression) {
                token.value.left = lexer_1.default.tokenize(value, token.value.left.position, token.value.right.value.left.next, {
                    left: token.value.left,
                    right: token.value.right.value.left
                }, token.type);
                token.type = token.value.right.type;
                token.value.right = token.value.right.value.right;
            }
        }
        return token;
    }
    Query.searchExpr = searchExpr;
    function searchTerm(value, index) {
        return Query.searchNotExpr(value, index) ||
            Query.searchPhrase(value, index) ||
            Query.searchWord(value, index);
    }
    Query.searchTerm = searchTerm;
    function searchNotExpr(value, index) {
        let rws = lexer_1.default.RWS(value, index);
        if (!utils_1.default.equals(value, rws, "NOT"))
            return;
        let start = index;
        index = rws + 3;
        rws = lexer_1.default.RWS(value, index);
        if (rws === index)
            return;
        index = rws;
        let expr = Query.searchPhrase(value, index) ||
            Query.searchWord(value, index);
        if (!expr)
            return;
        index = expr.next;
        return lexer_1.default.tokenize(value, start, index, expr, lexer_1.default.TokenType.SearchNotExpression);
    }
    Query.searchNotExpr = searchNotExpr;
    function searchOrExpr(value, index) {
        let rws = lexer_1.default.RWS(value, index);
        if (rws === index || !utils_1.default.equals(value, rws, "OR"))
            return;
        let start = index;
        index = rws + 2;
        rws = lexer_1.default.RWS(value, index);
        if (rws === index)
            return;
        index = rws;
        let token = Query.searchExpr(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, token, lexer_1.default.TokenType.SearchOrExpression);
    }
    Query.searchOrExpr = searchOrExpr;
    function searchAndExpr(value, index) {
        let rws = lexer_1.default.RWS(value, index);
        if (rws === index || !utils_1.default.equals(value, rws, "AND"))
            return;
        let start = index;
        index = rws + 3;
        rws = lexer_1.default.RWS(value, index);
        if (rws === index)
            return;
        index = rws;
        let token = Query.searchExpr(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, token, lexer_1.default.TokenType.SearchAndExpression);
    }
    Query.searchAndExpr = searchAndExpr;
    function searchPhrase(value, index) {
        let mark = lexer_1.default.quotationMark(value, index);
        if (mark === index)
            return;
        let start = index;
        index = mark;
        let valueStart = index;
        let ch = lexer_1.default.qcharNoAMPDQUOTE(value, index);
        while (ch > index && !lexer_1.default.OPEN(value, index) && !lexer_1.default.CLOSE(value, index)) {
            index = ch;
            ch = lexer_1.default.qcharNoAMPDQUOTE(value, index);
        }
        let valueEnd = index;
        mark = lexer_1.default.quotationMark(value, index);
        if (!mark)
            return;
        index = mark;
        return lexer_1.default.tokenize(value, start, index, utils_1.default.stringify(value, valueStart, valueEnd), lexer_1.default.TokenType.SearchPhrase);
    }
    Query.searchPhrase = searchPhrase;
    function searchWord(value, index) {
        let next = utils_1.default.required(value, index, lexer_1.default.ALPHA, 1);
        if (!next)
            return;
        let start = index;
        index = next;
        let token = lexer_1.default.tokenize(value, start, index, null, lexer_1.default.TokenType.SearchWord);
        token.value = token.raw;
        return token;
    }
    Query.searchWord = searchWord;
    function searchParenExpr(value, index) {
        let open = lexer_1.default.OPEN(value, index);
        if (!open)
            return;
        let start = index;
        index = open;
        index = lexer_1.default.BWS(value, index);
        let expr = Query.searchExpr(value, index);
        if (!expr)
            return;
        index = expr.next;
        index = lexer_1.default.BWS(value, index);
        let close = lexer_1.default.CLOSE(value, index);
        if (!close)
            return;
        index = close;
        return lexer_1.default.tokenize(value, start, index, expr, lexer_1.default.TokenType.SearchParenExpression);
    }
    Query.searchParenExpr = searchParenExpr;
    function levels(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24levels")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$levels")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let level;
        if (utils_1.default.equals(value, index, "max")) {
            level = "max";
            index += 3;
        }
        else {
            let token = primitiveLiteral_1.default.int32Value(value, index);
            if (!token)
                return;
            level = token.raw;
            index = token.next;
        }
        return lexer_1.default.tokenize(value, start, index, level, lexer_1.default.TokenType.Levels);
    }
    Query.levels = levels;
    function filter(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24filter")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$filter")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let expr = expressions_1.default.boolCommonExpr(value, index);
        if (!expr)
            return;
        index = expr.next;
        return lexer_1.default.tokenize(value, start, index, expr, lexer_1.default.TokenType.Filter);
    }
    Query.filter = filter;
    function orderby(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24orderby")) {
            index += 10;
        }
        else if (utils_1.default.equals(value, index, "$orderby")) {
            index += 8;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let items = [];
        let token = Query.orderbyItem(value, index);
        if (!token)
            return;
        index = token.next;
        while (token) {
            items.push(token);
            let comma = lexer_1.default.COMMA(value, index);
            if (comma) {
                index = comma;
                token = Query.orderbyItem(value, index);
                if (!token)
                    return;
                index = token.next;
            }
            else
                break;
        }
        return lexer_1.default.tokenize(value, start, index, { items }, lexer_1.default.TokenType.OrderBy);
    }
    Query.orderby = orderby;
    function orderbyItem(value, index) {
        let expr = expressions_1.default.commonExpr(value, index);
        if (!expr)
            return;
        let start = index;
        index = expr.next;
        let direction = 1;
        let rws = lexer_1.default.RWS(value, index);
        if (rws > index) {
            index = rws;
            if (utils_1.default.equals(value, index, "asc"))
                index += 3;
            else if (utils_1.default.equals(value, index, "desc")) {
                index += 4;
                direction = -1;
            }
            else
                return;
        }
        return lexer_1.default.tokenize(value, start, index, { expr, direction }, lexer_1.default.TokenType.OrderByItem);
    }
    Query.orderbyItem = orderbyItem;
    function skip(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24skip")) {
            index += 7;
        }
        else if (utils_1.default.equals(value, index, "$skip")) {
            index += 5;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let token = primitiveLiteral_1.default.int32Value(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, token, lexer_1.default.TokenType.Skip);
    }
    Query.skip = skip;
    function top(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24top")) {
            index += 6;
        }
        else if (utils_1.default.equals(value, index, "$top")) {
            index += 4;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let token = primitiveLiteral_1.default.int32Value(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, token, lexer_1.default.TokenType.Top);
    }
    Query.top = top;
    function format(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24format")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$format")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let format;
        if (utils_1.default.equals(value, index, "atom")) {
            format = "atom";
            index += 4;
        }
        else if (utils_1.default.equals(value, index, "json")) {
            format = "json";
            index += 4;
        }
        else if (utils_1.default.equals(value, index, "xml")) {
            format = "xml";
            index += 3;
        }
        if (format)
            return lexer_1.default.tokenize(value, start, index, { format }, lexer_1.default.TokenType.Format);
    }
    Query.format = format;
    function inlinecount(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24count")) {
            index += 8;
        }
        else if (utils_1.default.equals(value, index, "$count")) {
            index += 6;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let token = primitiveLiteral_1.default.booleanValue(value, index);
        if (!token)
            return;
        index = token.next;
        return lexer_1.default.tokenize(value, start, index, token, lexer_1.default.TokenType.InlineCount);
    }
    Query.inlinecount = inlinecount;
    function select(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24select")) {
            index += 9;
        }
        else if (utils_1.default.equals(value, index, "$select")) {
            index += 7;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let items = [];
        let token = Query.selectItem(value, index);
        if (!token)
            return;
        while (token) {
            items.push(token);
            index = token.next;
            let comma = lexer_1.default.COMMA(value, index);
            if (comma) {
                index = comma;
                token = Query.selectItem(value, index);
                if (!token)
                    return;
            }
            else
                break;
        }
        return lexer_1.default.tokenize(value, start, index, { items }, lexer_1.default.TokenType.Select);
    }
    Query.select = select;
    function selectItem(value, index) {
        let start = index;
        let item;
        let op = Query.allOperationsInSchema(value, index);
        let star = lexer_1.default.STAR(value, index);
        if (op > index) {
            item = { namespace: utils_1.default.stringify(value, index, op - 2), value: "*" };
            index = op;
        }
        else if (star) {
            item = { value: "*" };
            index = star;
        }
        else {
            item = {};
            let name = nameOrIdentifier_1.default.qualifiedEntityTypeName(value, index) ||
                nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index);
            if (name && value[name.next] !== 0x2f)
                return;
            else if (name && value[name.next] === 0x2f) {
                index++;
                item.name = name;
            }
            let select = Query.selectProperty(value, index) ||
                Query.qualifiedActionName(value, index) ||
                Query.qualifiedFunctionName(value, index);
            if (!select)
                return;
            index = select.next;
            item = name ? { name, select } : select;
        }
        if (index > start)
            return lexer_1.default.tokenize(value, start, index, item, lexer_1.default.TokenType.SelectItem);
    }
    Query.selectItem = selectItem;
    function allOperationsInSchema(value, index) {
        let namespaceNext = nameOrIdentifier_1.default.namespace(value, index);
        let star = lexer_1.default.STAR(value, namespaceNext + 1);
        if (namespaceNext > index && value[namespaceNext] === 0x2e && star)
            return star;
        return index;
    }
    Query.allOperationsInSchema = allOperationsInSchema;
    function selectProperty(value, index) {
        let token = Query.selectPath(value, index) ||
            nameOrIdentifier_1.default.primitiveProperty(value, index) ||
            nameOrIdentifier_1.default.primitiveColProperty(value, index) ||
            nameOrIdentifier_1.default.navigationProperty(value, index);
        if (!token)
            return;
        let start = index;
        index = token.next;
        if (token.type === lexer_1.default.TokenType.SelectPath) {
            if (value[index] === 0x2f) {
                index++;
                let prop = Query.selectProperty(value, index);
                if (!prop)
                    return;
                let path = lexer_1.default.clone(token);
                token.next = prop.next;
                token.raw = utils_1.default.stringify(value, start, token.next);
                token.value = { path, next: prop };
            }
        }
        return token;
    }
    Query.selectProperty = selectProperty;
    function selectPath(value, index) {
        let token = nameOrIdentifier_1.default.complexProperty(value, index) ||
            nameOrIdentifier_1.default.complexColProperty(value, index);
        if (!token)
            return;
        let start = index;
        index = token.next;
        let tokenValue = token;
        if (value[index] === 0x2f) {
            let name = nameOrIdentifier_1.default.qualifiedComplexTypeName(value, index + 1);
            if (name) {
                index = name.next;
                tokenValue = { prop: token, name };
            }
        }
        return lexer_1.default.tokenize(value, start, index, tokenValue, lexer_1.default.TokenType.SelectPath);
    }
    Query.selectPath = selectPath;
    function qualifiedActionName(value, index) {
        let namespaceNext = nameOrIdentifier_1.default.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let start = index;
        index = namespaceNext + 1;
        let action = nameOrIdentifier_1.default.action(value, index);
        if (!action)
            return;
        action.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        return lexer_1.default.tokenize(value, start, action.next, action, lexer_1.default.TokenType.Action);
    }
    Query.qualifiedActionName = qualifiedActionName;
    function qualifiedFunctionName(value, index) {
        let namespaceNext = nameOrIdentifier_1.default.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let start = index;
        index = namespaceNext + 1;
        let fn = nameOrIdentifier_1.default.odataFunction(value, index);
        if (!fn)
            return;
        fn.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        index = fn.next;
        let tokenValue = { name: fn };
        let open = lexer_1.default.OPEN(value, index);
        if (open) {
            index = open;
            tokenValue.parameters = [];
            let param = expressions_1.default.parameterName(value, index);
            if (!param)
                return;
            while (param) {
                index = param.next;
                tokenValue.parameters.push(param);
                let comma = lexer_1.default.COMMA(value, index);
                if (comma) {
                    index = comma;
                    let param = expressions_1.default.parameterName(value, index);
                    if (!param)
                        return;
                }
                else
                    break;
            }
            let close = lexer_1.default.CLOSE(value, index);
            if (!close)
                return;
            index = close;
        }
        return lexer_1.default.tokenize(value, start, index, tokenValue, lexer_1.default.TokenType.Function);
    }
    Query.qualifiedFunctionName = qualifiedFunctionName;
    function skiptoken(value, index) {
        let start = index;
        if (utils_1.default.equals(value, index, "%24skiptoken")) {
            index += 12;
        }
        else if (utils_1.default.equals(value, index, "$skiptoken")) {
            index += 10;
        }
        else
            return;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let ch = lexer_1.default.qcharNoAMP(value, index);
        if (!ch)
            return;
        let valueStart = index;
        while (ch > index) {
            index = ch;
            ch = lexer_1.default.qcharNoAMP(value, index);
        }
        return lexer_1.default.tokenize(value, start, index, utils_1.default.stringify(value, valueStart, index), lexer_1.default.TokenType.SkipToken);
    }
    Query.skiptoken = skiptoken;
    function aliasAndValue(value, index) {
        let alias = expressions_1.default.parameterAlias(value, index);
        if (!alias)
            return;
        let start = index;
        index = alias.next;
        let eq = lexer_1.default.EQ(value, index);
        if (!eq)
            return;
        index = eq;
        let paramValue = expressions_1.default.parameterValue(value, index);
        if (!paramValue)
            return;
        index = paramValue.next;
        return lexer_1.default.tokenize(value, start, index, {
            alias,
            value: paramValue
        }, lexer_1.default.TokenType.AliasAndValue);
    }
    Query.aliasAndValue = aliasAndValue;
})(Query = exports.Query || (exports.Query = {}));
exports.default = Query;
//# sourceMappingURL=query.js.map