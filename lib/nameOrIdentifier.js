"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameOrIdentifier = void 0;
const utils_1 = require("./utils");
const lexer_1 = require("./lexer");
const primitiveLiteral_1 = require("./primitiveLiteral");
var NameOrIdentifier;
(function (NameOrIdentifier) {
    function enumeration(value, index) {
        let type = qualifiedEnumTypeName(value, index);
        if (!type)
            return;
        let start = index;
        index = type.next;
        let squote = lexer_1.default.SQUOTE(value, index);
        if (!squote)
            return;
        index = squote;
        let enumVal = NameOrIdentifier.enumValue(value, index);
        if (!enumVal)
            return;
        index = enumVal.next;
        squote = lexer_1.default.SQUOTE(value, index);
        if (!squote)
            return;
        index = squote;
        return lexer_1.default.tokenize(value, start, index, {
            name: type,
            value: enumVal
        }, lexer_1.default.TokenType.Enum);
    }
    NameOrIdentifier.enumeration = enumeration;
    function enumValue(value, index) {
        let val = NameOrIdentifier.singleEnumValue(value, index);
        if (!val)
            return;
        let start = index;
        let arr = [];
        while (val) {
            arr.push(val);
            index = val.next;
            let comma = lexer_1.default.COMMA(value, val.next);
            if (comma) {
                index = comma;
                val = NameOrIdentifier.singleEnumValue(value, index);
            }
            else
                break;
        }
        return lexer_1.default.tokenize(value, start, index, { values: arr }, lexer_1.default.TokenType.EnumValue);
    }
    NameOrIdentifier.enumValue = enumValue;
    function singleEnumValue(value, index) {
        return NameOrIdentifier.enumerationMember(value, index) ||
            NameOrIdentifier.enumMemberValue(value, index);
    }
    NameOrIdentifier.singleEnumValue = singleEnumValue;
    function enumMemberValue(value, index) {
        let token = primitiveLiteral_1.default.int64Value(value, index);
        if (token) {
            token.type = lexer_1.default.TokenType.EnumMemberValue;
            return token;
        }
    }
    NameOrIdentifier.enumMemberValue = enumMemberValue;
    function singleQualifiedTypeName(value, index) {
        return NameOrIdentifier.qualifiedEntityTypeName(value, index) ||
            NameOrIdentifier.qualifiedComplexTypeName(value, index) ||
            NameOrIdentifier.qualifiedTypeDefinitionName(value, index) ||
            NameOrIdentifier.qualifiedEnumTypeName(value, index) ||
            NameOrIdentifier.primitiveTypeName(value, index);
    }
    NameOrIdentifier.singleQualifiedTypeName = singleQualifiedTypeName;
    function qualifiedTypeName(value, index) {
        if (utils_1.default.equals(value, index, "Collection")) {
            let start = index;
            index += 10;
            let squote = lexer_1.default.SQUOTE(value, index);
            if (!squote)
                return;
            index = squote;
            let token = NameOrIdentifier.singleQualifiedTypeName(value, index);
            if (!token)
                return;
            else
                index = token.next;
            squote = lexer_1.default.SQUOTE(value, index);
            if (!squote)
                return;
            index = squote;
            token.position = start;
            token.next = index;
            token.raw = utils_1.default.stringify(value, token.position, token.next);
            token.type = lexer_1.default.TokenType.Collection;
        }
        else
            return NameOrIdentifier.singleQualifiedTypeName(value, index);
    }
    NameOrIdentifier.qualifiedTypeName = qualifiedTypeName;
    function qualifiedEntityTypeName(value, index, metadataContext) {
        let start = index;
        let namespaceNext = NameOrIdentifier.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let schema;
        if (typeof metadataContext === "object") {
            schema = NameOrIdentifier.getMetadataRoot(metadataContext).schemas.filter(it => it.namespace === utils_1.default.stringify(value, start, namespaceNext))[0];
        }
        let name = NameOrIdentifier.entityTypeName(value, namespaceNext + 1, schema);
        if (!name)
            return;
        name.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        return lexer_1.default.tokenize(value, start, name.next, name, lexer_1.default.TokenType.QualifiedEntityTypeName);
    }
    NameOrIdentifier.qualifiedEntityTypeName = qualifiedEntityTypeName;
    function qualifiedComplexTypeName(value, index, metadataContext) {
        let start = index;
        let namespaceNext = NameOrIdentifier.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let schema;
        if (typeof metadataContext === "object") {
            schema = NameOrIdentifier.getMetadataRoot(metadataContext).schemas.filter(it => it.namespace === utils_1.default.stringify(value, start, namespaceNext))[0];
        }
        let name = NameOrIdentifier.complexTypeName(value, namespaceNext + 1, schema);
        if (!name)
            return;
        name.value.namespace = utils_1.default.stringify(value, start, namespaceNext);
        return lexer_1.default.tokenize(value, start, name.next, name, lexer_1.default.TokenType.QualifiedComplexTypeName);
    }
    NameOrIdentifier.qualifiedComplexTypeName = qualifiedComplexTypeName;
    function qualifiedTypeDefinitionName(value, index) {
        let start = index;
        let namespaceNext = NameOrIdentifier.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let nameNext = NameOrIdentifier.typeDefinitionName(value, namespaceNext + 1);
        if (nameNext && nameNext.next === namespaceNext + 1)
            return;
        return lexer_1.default.tokenize(value, start, nameNext.next, "TypeDefinitionName", lexer_1.default.TokenType.Identifier);
    }
    NameOrIdentifier.qualifiedTypeDefinitionName = qualifiedTypeDefinitionName;
    function qualifiedEnumTypeName(value, index) {
        let start = index;
        let namespaceNext = NameOrIdentifier.namespace(value, index);
        if (namespaceNext === index || value[namespaceNext] !== 0x2e)
            return;
        let nameNext = NameOrIdentifier.enumerationTypeName(value, namespaceNext + 1);
        if (nameNext && nameNext.next === namespaceNext + 1)
            return;
        return lexer_1.default.tokenize(value, start, nameNext.next, "EnumTypeName", lexer_1.default.TokenType.Identifier);
    }
    NameOrIdentifier.qualifiedEnumTypeName = qualifiedEnumTypeName;
    function namespace(value, index) {
        let part = NameOrIdentifier.namespacePart(value, index);
        while (part && part.next > index) {
            index = part.next;
            if (value[part.next] === 0x2e) {
                index++;
                part = NameOrIdentifier.namespacePart(value, index);
                if (part && value[part.next] !== 0x2e)
                    return index - 1;
            }
        }
        return index - 1;
    }
    NameOrIdentifier.namespace = namespace;
    function odataIdentifier(value, index, tokenType) {
        let start = index;
        if (lexer_1.default.identifierLeadingCharacter(value[index])) {
            index++;
            while (index < value.length && (index - start < 128) && lexer_1.default.identifierCharacter(value[index])) {
                index++;
            }
        }
        if (index > start)
            return lexer_1.default.tokenize(value, start, index, { name: utils_1.default.stringify(value, start, index) }, tokenType || lexer_1.default.TokenType.ODataIdentifier);
    }
    NameOrIdentifier.odataIdentifier = odataIdentifier;
    function namespacePart(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.NamespacePart); }
    NameOrIdentifier.namespacePart = namespacePart;
    function entitySetName(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntitySetName);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let entitySet;
            metadataContext.dataServices.schemas.forEach(schema => schema.entityContainer.forEach(container => container.entitySets.filter((set) => {
                let eq = set.name === token.raw;
                if (eq)
                    entitySet = set;
                return eq;
            })));
            if (!entitySet)
                return;
            let entityType;
            metadataContext.dataServices.schemas.forEach(schema => entitySet.entityType.indexOf(schema.namespace + ".") === 0 && schema.entityTypes.filter((type) => {
                let eq = type.name === entitySet.entityType.replace(schema.namespace + ".", "");
                if (eq)
                    entityType = type;
                return eq;
            }));
            if (!entityType)
                return;
            token.metadata = entityType;
        }
        return token;
    }
    NameOrIdentifier.entitySetName = entitySetName;
    function singletonEntity(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.SingletonEntity); }
    NameOrIdentifier.singletonEntity = singletonEntity;
    function entityTypeName(value, index, schema) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityTypeName);
        if (!token)
            return;
        if (typeof schema === "object") {
            let type = schema.entityTypes.filter(it => it.name === token.raw)[0];
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.entityTypeName = entityTypeName;
    function complexTypeName(value, index, schema) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexTypeName);
        if (!token)
            return;
        if (typeof schema === "object") {
            let type = schema.complexTypes.filter(it => it.name === token.raw)[0];
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.complexTypeName = complexTypeName;
    function typeDefinitionName(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.TypeDefinitionName); }
    NameOrIdentifier.typeDefinitionName = typeDefinitionName;
    function enumerationTypeName(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EnumerationTypeName); }
    NameOrIdentifier.enumerationTypeName = enumerationTypeName;
    function enumerationMember(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EnumerationMember); }
    NameOrIdentifier.enumerationMember = enumerationMember;
    function termName(value, index) { return NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.TermName); }
    NameOrIdentifier.termName = termName;
    function primitiveTypeName(value, index) {
        if (!utils_1.default.equals(value, index, "Edm."))
            return;
        let start = index;
        index += 4;
        let end = index + (utils_1.default.equals(value, index, "Binary") ||
            utils_1.default.equals(value, index, "Boolean") ||
            utils_1.default.equals(value, index, "Byte") ||
            utils_1.default.equals(value, index, "Date") ||
            utils_1.default.equals(value, index, "DateTimeOffset") ||
            utils_1.default.equals(value, index, "Decimal") ||
            utils_1.default.equals(value, index, "Double") ||
            utils_1.default.equals(value, index, "Duration") ||
            utils_1.default.equals(value, index, "Guid") ||
            utils_1.default.equals(value, index, "Int16") ||
            utils_1.default.equals(value, index, "Int32") ||
            utils_1.default.equals(value, index, "Int64") ||
            utils_1.default.equals(value, index, "SByte") ||
            utils_1.default.equals(value, index, "Single") ||
            utils_1.default.equals(value, index, "Stream") ||
            utils_1.default.equals(value, index, "String") ||
            utils_1.default.equals(value, index, "TimeOfDay") ||
            utils_1.default.equals(value, index, "GeographyCollection") ||
            utils_1.default.equals(value, index, "GeographyLineString") ||
            utils_1.default.equals(value, index, "GeographyMultiLineString") ||
            utils_1.default.equals(value, index, "GeographyMultiPoint") ||
            utils_1.default.equals(value, index, "GeographyMultiPolygon") ||
            utils_1.default.equals(value, index, "GeographyPoint") ||
            utils_1.default.equals(value, index, "GeographyPolygon") ||
            utils_1.default.equals(value, index, "GeometryCollection") ||
            utils_1.default.equals(value, index, "GeometryLineString") ||
            utils_1.default.equals(value, index, "GeometryMultiLineString") ||
            utils_1.default.equals(value, index, "GeometryMultiPoint") ||
            utils_1.default.equals(value, index, "GeometryMultiPolygon") ||
            utils_1.default.equals(value, index, "GeometryPoint") ||
            utils_1.default.equals(value, index, "GeometryPolygon"));
        if (end > index)
            return lexer_1.default.tokenize(value, start, end, "PrimitiveTypeName", lexer_1.default.TokenType.Identifier);
    }
    NameOrIdentifier.primitiveTypeName = primitiveTypeName;
    const primitiveTypes = [
        "Edm.Binary", "Edm.Boolean", "Edm.Byte", "Edm.Date", "Edm.DateTimeOffset", "Edm.Decimal", "Edm.Double", "Edm.Duration", "Edm.Guid",
        "Edm.Int16", "Edm.Int32", "Edm.Int64", "Edm.SByte", "Edm.Single", "Edm.Stream", "Edm.String", "Edm.TimeOfDay",
        "Edm.GeographyCollection", "Edm.GeographyLineString", "Edm.GeographyMultiLineString", "Edm.GeographyMultiPoint", "Edm.GeographyMultiPolygon", "Edm.GeographyPoint", "Edm.GeographyPolygon",
        "Edm.GeometryCollection", "Edm.GeometryLineString", "Edm.GeometryMultiLineString", "Edm.GeometryMultiPoint", "Edm.GeometryMultiPolygon", "Edm.GeometryPoint", "Edm.GeometryPolygon"
    ];
    function isPrimitiveTypeName(type, metadataContext) {
        let root = NameOrIdentifier.getMetadataRoot(metadataContext);
        let schemas = root.schemas || (root.dataServices && root.dataServices.schemas) || [];
        let schema = schemas.filter(function (it) { return type.indexOf(it.namespace + ".") === 0; })[0];
        if (schema) {
            return ((schema.enumTypes && schema.enumTypes.filter(function (it) { return it.name === type.split(".").pop(); })[0]) ||
                (schema.typeDefinitions && schema.typeDefinitions.filter(function (it) { return it.name === type.split(".").pop(); })[0])) &&
                !((schema.entityTypes && schema.entityTypes.filter(function (it) { return it.name === type.split(".").pop(); })[0]) ||
                    (schema.complexTypes && schema.complexTypes.filter(function (it) { return it.name === type.split(".").pop(); })[0]));
        }
        return primitiveTypes.indexOf(type) >= 0;
    }
    NameOrIdentifier.isPrimitiveTypeName = isPrimitiveTypeName;
    function getMetadataRoot(metadataContext) {
        let root = metadataContext;
        while (root.parent) {
            root = root.parent;
        }
        return root.dataServices || root;
    }
    NameOrIdentifier.getMetadataRoot = getMetadataRoot;
    function primitiveProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.properties.length; i++) {
                let prop = metadataContext.properties[i];
                if (prop.name === token.raw) {
                    if (prop.type.indexOf("Collection") === 0 || !NameOrIdentifier.isPrimitiveTypeName(prop.type, metadataContext))
                        return;
                    token.metadata = prop;
                    if (metadataContext.key && metadataContext.key.propertyRefs.filter(it => it.name === prop.name).length > 0) {
                        token.type = lexer_1.default.TokenType.PrimitiveKeyProperty;
                    }
                    break;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.primitiveProperty = primitiveProperty;
    function primitiveKeyProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.primitiveProperty(value, index, metadataContext);
        if (token && token.type === lexer_1.default.TokenType.PrimitiveKeyProperty)
            return token;
    }
    NameOrIdentifier.primitiveKeyProperty = primitiveKeyProperty;
    function primitiveNonKeyProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.primitiveProperty(value, index, metadataContext);
        if (token && token.type === lexer_1.default.TokenType.PrimitiveProperty)
            return token;
    }
    NameOrIdentifier.primitiveNonKeyProperty = primitiveNonKeyProperty;
    function primitiveColProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveCollectionProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.properties.length; i++) {
                let prop = metadataContext.properties[i];
                if (prop.name === token.raw) {
                    if (prop.type.indexOf("Collection") === -1 || !NameOrIdentifier.isPrimitiveTypeName(prop.type.slice(11, -1), metadataContext))
                        return;
                    token.metadata = prop;
                    if (metadataContext.key.propertyRefs.filter(it => it.name === prop.name).length > 0) {
                        token.type = lexer_1.default.TokenType.PrimitiveKeyProperty;
                    }
                    break;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.primitiveColProperty = primitiveColProperty;
    function complexProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.properties.length; i++) {
                let prop = metadataContext.properties[i];
                if (prop.name === token.raw) {
                    if (prop.type.indexOf("Collection") === 0 || NameOrIdentifier.isPrimitiveTypeName(prop.type, metadataContext))
                        return;
                    let root = NameOrIdentifier.getMetadataRoot(metadataContext);
                    let schema = root.schemas.filter(it => prop.type.indexOf(it.namespace + ".") === 0)[0];
                    if (!schema)
                        return;
                    let complexType = schema.complexTypes.filter(it => it.name === prop.type.split(".").pop())[0];
                    if (!complexType)
                        return;
                    token.metadata = complexType;
                    break;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.complexProperty = complexProperty;
    function complexColProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexCollectionProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.properties.length; i++) {
                let prop = metadataContext.properties[i];
                if (prop.name === token.raw) {
                    if (prop.type.indexOf("Collection") === -1 || NameOrIdentifier.isPrimitiveTypeName(prop.type.slice(11, -1), metadataContext))
                        return;
                    let root = NameOrIdentifier.getMetadataRoot(metadataContext);
                    let schema = root.schemas.filter(it => prop.type.slice(11, -1).indexOf(it.namespace + ".") === 0)[0];
                    if (!schema)
                        return;
                    let complexType = schema.complexTypes.filter(it => it.name === prop.type.slice(11, -1).split(".").pop())[0];
                    if (!complexType)
                        return;
                    token.metadata = complexType;
                    break;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.complexColProperty = complexColProperty;
    function streamProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.StreamProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.properties.length; i++) {
                let prop = metadataContext.properties[i];
                if (prop.name === token.raw) {
                    if (prop.type !== "Edm.Stream")
                        return;
                    token.metadata = prop;
                    break;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.streamProperty = streamProperty;
    function navigationProperty(value, index, metadataContext) {
        return NameOrIdentifier.entityNavigationProperty(value, index, metadataContext) ||
            NameOrIdentifier.entityColNavigationProperty(value, index, metadataContext);
    }
    NameOrIdentifier.navigationProperty = navigationProperty;
    function entityNavigationProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityNavigationProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.navigationProperties.length; i++) {
                let prop = metadataContext.navigationProperties[i];
                if (prop.name === token.raw && prop.type.indexOf("Collection") === -1 && !NameOrIdentifier.isPrimitiveTypeName(prop.type.slice(11, -1), metadataContext)) {
                    let root = NameOrIdentifier.getMetadataRoot(metadataContext);
                    let schema = root.schemas.filter(it => prop.type.indexOf(it.namespace + ".") === 0)[0];
                    if (!schema)
                        return;
                    let entityType = schema.entityTypes.filter(it => it.name === prop.type.split(".").pop())[0];
                    if (!entityType)
                        return;
                    token.metadata = entityType;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.entityNavigationProperty = entityNavigationProperty;
    function entityColNavigationProperty(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityCollectionNavigationProperty);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            for (let i = 0; i < metadataContext.navigationProperties.length; i++) {
                let prop = metadataContext.navigationProperties[i];
                if (prop.name === token.raw && prop.type.indexOf("Collection") === 0 && !NameOrIdentifier.isPrimitiveTypeName(prop.type.slice(11, -1), metadataContext)) {
                    let root = NameOrIdentifier.getMetadataRoot(metadataContext);
                    let schema = root.schemas.filter(it => prop.type.slice(11, -1).indexOf(it.namespace + ".") === 0)[0];
                    if (!schema)
                        return;
                    let entityType = schema.entityTypes.filter(it => it.name === prop.type.slice(11, -1).split(".").pop())[0];
                    if (!entityType)
                        return;
                    token.metadata = entityType;
                }
            }
            if (!token.metadata)
                return;
        }
        return token;
    }
    NameOrIdentifier.entityColNavigationProperty = entityColNavigationProperty;
    function action(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.Action);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("action", metadataContext, token, isCollection, false, false, "entityTypes");
            if (!type)
                return;
        }
        return token;
    }
    NameOrIdentifier.action = action;
    function actionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ActionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("action", metadataContext, token);
            if (!type)
                return;
        }
        return token;
    }
    NameOrIdentifier.actionImport = actionImport;
    function odataFunction(value, index) {
        return NameOrIdentifier.entityFunction(value, index) ||
            NameOrIdentifier.entityColFunction(value, index) ||
            NameOrIdentifier.complexFunction(value, index) ||
            NameOrIdentifier.complexColFunction(value, index) ||
            NameOrIdentifier.primitiveFunction(value, index) ||
            NameOrIdentifier.primitiveColFunction(value, index);
    }
    NameOrIdentifier.odataFunction = odataFunction;
    function getOperationType(operation, metadataContext, token, isBoundCollection, isCollection, isPrimitive, types) {
        let bindingParameterType = metadataContext.parent.namespace + "." + metadataContext.name;
        if (isBoundCollection)
            bindingParameterType = "Collection(" + bindingParameterType + ")";
        let fnDef;
        let root = NameOrIdentifier.getMetadataRoot(metadataContext);
        for (let i = 0; i < root.schemas.length; i++) {
            let schema = root.schemas[i];
            for (let j = 0; j < schema[operation + "s"].length; j++) {
                let fn = schema[operation + "s"][j];
                if (fn.name === token.raw && fn.isBound) {
                    for (let k = 0; k < fn.parameters.length; k++) {
                        let param = fn.parameters[k];
                        if (param.name === "bindingParameter" && param.type === bindingParameterType) {
                            fnDef = fn;
                            break;
                        }
                    }
                }
                if (fnDef)
                    break;
            }
            if (fnDef)
                break;
        }
        if (!fnDef)
            return;
        if (operation === "action")
            return fnDef;
        if (fnDef.returnType.type.indexOf("Collection") === isCollection ? -1 : 0)
            return;
        let elementType = isCollection ? fnDef.returnType.type.slice(11, -1) : fnDef.returnType.type;
        if (NameOrIdentifier.isPrimitiveTypeName(elementType, metadataContext) && !isPrimitive)
            return;
        if (!NameOrIdentifier.isPrimitiveTypeName(elementType, metadataContext) && isPrimitive)
            return;
        if (isPrimitive)
            return elementType;
        let type;
        for (let i = 0; i < root.schemas.length; i++) {
            let schema = root.schemas[i];
            if (elementType.indexOf(schema.namespace + ".") === 0) {
                for (let j = 0; j < schema[types].length; j++) {
                    let it = schema[types][j];
                    if (schema.namespace + "." + it.name === elementType) {
                        type = it;
                        break;
                    }
                }
            }
            if (type)
                break;
        }
        return type;
    }
    NameOrIdentifier.getOperationType = getOperationType;
    function entityFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, false, false, "entityTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.entityFunction = entityFunction;
    function entityColFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityCollectionFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, true, false, "entityTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.entityColFunction = entityColFunction;
    function complexFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, false, false, "complexTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.complexFunction = complexFunction;
    function complexColFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexCollectionFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, true, false, "complexTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.complexColFunction = complexColFunction;
    function primitiveFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, false, true);
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.primitiveFunction = primitiveFunction;
    function primitiveColFunction(value, index, isCollection, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveCollectionFunction);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationType("function", metadataContext, token, isCollection, true, true);
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.primitiveColFunction = primitiveColFunction;
    function getOperationImportType(operation, metadataContext, token, isCollection, isPrimitive, types) {
        let fnImport;
        for (let i = 0; i < metadataContext.dataServices.schemas.length; i++) {
            let schema = metadataContext.dataServices.schemas[i];
            for (let j = 0; j < schema.entityContainer.length; j++) {
                let container = schema.entityContainer[j];
                for (let k = 0; k < container[operation + "Imports"].length; k++) {
                    let it = container[operation + "Imports"][k];
                    if (it.name === token.raw) {
                        fnImport = it;
                        break;
                    }
                }
                if (fnImport)
                    break;
            }
            if (fnImport)
                break;
        }
        if (!fnImport)
            return;
        let fn;
        for (let i = 0; i < metadataContext.dataServices.schemas.length; i++) {
            let schema = metadataContext.dataServices.schemas[i];
            if (fnImport[operation].indexOf(schema.namespace + ".") === 0) {
                for (let j = 0; j < schema[operation + "s"].length; j++) {
                    let it = schema[operation + "s"][j];
                    if (it.name === fnImport.name) {
                        fn = it;
                        break;
                    }
                }
            }
            if (fn)
                break;
        }
        if (!fn)
            return;
        if (operation === "action")
            return fn;
        if (fn.returnType.type.indexOf("Collection") === isCollection ? -1 : 0)
            return;
        let elementType = isCollection ? fn.returnType.type.slice(11, -1) : fn.returnType.type;
        if (NameOrIdentifier.isPrimitiveTypeName(elementType, metadataContext) && !isPrimitive)
            return;
        if (!NameOrIdentifier.isPrimitiveTypeName(elementType, metadataContext) && isPrimitive)
            return;
        if (isPrimitive)
            return elementType;
        let type;
        for (let i = 0; i < metadataContext.dataServices.schemas.length; i++) {
            let schema = metadataContext.dataServices.schemas[i];
            if (elementType.indexOf(schema.namespace + ".") === 0) {
                for (let j = 0; j < schema[types].length; j++) {
                    let it = schema[types][j];
                    if (schema.namespace + "." + it.name === elementType) {
                        type = it;
                        break;
                    }
                }
            }
            if (type)
                break;
        }
        return type;
    }
    NameOrIdentifier.getOperationImportType = getOperationImportType;
    function entityFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, false, false, "entityTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.entityFunctionImport = entityFunctionImport;
    function entityColFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.EntityCollectionFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, true, false, "entityTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.entityColFunctionImport = entityColFunctionImport;
    function complexFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, false, false, "complexTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.complexFunctionImport = complexFunctionImport;
    function complexColFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.ComplexCollectionFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, true, false, "complexTypes");
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.complexColFunctionImport = complexColFunctionImport;
    function primitiveFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, false, true);
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.primitiveFunctionImport = primitiveFunctionImport;
    function primitiveColFunctionImport(value, index, metadataContext) {
        let token = NameOrIdentifier.odataIdentifier(value, index, lexer_1.default.TokenType.PrimitiveCollectionFunctionImport);
        if (!token)
            return;
        if (typeof metadataContext === "object") {
            let type = NameOrIdentifier.getOperationImportType("function", metadataContext, token, true, true);
            if (!type)
                return;
            token.metadata = type;
        }
        return token;
    }
    NameOrIdentifier.primitiveColFunctionImport = primitiveColFunctionImport;
})(NameOrIdentifier = exports.NameOrIdentifier || (exports.NameOrIdentifier = {}));
exports.default = NameOrIdentifier;
//# sourceMappingURL=nameOrIdentifier.js.map