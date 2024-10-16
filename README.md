# OData v4 Parser

OData v4 parser based on OASIS Standard OData v4 ABNF grammar

## How to build

Simply just use ```$ npm run build```

Run TDD tests using ```$ npm run tdd```

## How to use

Parser functions:

```javascript
var parser = require('odata-v4-parser');
parser.filter("Title eq 'Article1'");
```

## Samples

**Equality Check**

- `$filter=category eq 'Books'`
- `$filter=price eq 19.99`

**Inequality Check**

- `$filter=price ne 19.99`
- `$filter=category ne 'Electronics'`

**Greater Than / Less Than**

- `$filter=price gt 19.99`
- `$filter=price lt 50.00`
- `$filter=price ge 19.99`
- `$filter=price le 50.00`

**Logical Operators**

- `$filter=price gt 19.99 and price lt 50.00`
- `$filter=category eq 'Books' or category eq 'Electronics'`

**Null Checks**

- `$filter=category is null`
- `$filter=category is not null`
- `$filter=category is nullOrEmpty`

**String Functions**

- `$filter=startswith(name, 'A')`
- `$filter=endswith(name, 'Z')`
- `$filter=contains(description, 'discount')`

**Arithmetic Operations**

- `$filter=price add 5 eq 24.99`
- `$filter=price sub 5 eq 14.99`
- `$filter=price mul 2 eq 39.98`
- `$filter=price div 2 eq 9.99`
- `$filter=price mod 5 eq 4.99`

**Date Functions**

- `$filter=date eq 2023-01-01`
- `$filter=date gt 2023-01-01`
- `$filter=date lt 2023-12-31`

**Boolean Functions**

- `$filter=isActive eq true`
- `$filter=isActive eq false`

**Complex Expressions**

- `$filter=(price gt 19.99 and price lt 50.00) or (category eq 'Books' and isActive eq true)`
- `$filter=(startswith(name, 'A') or endswith(name, 'Z')) and price le 100.00`



### Low-level functional:

```javascript
require('odata-v4-parser/lib/expressions').boolCommonExpr(new Uint8Array(new Buffer("contains(@word,Title)")), 0);
require('odata-v4-parser/lib/json').arrayOrObject(new Uint8Array(new Buffer('{"a":1}')), 0);
require('odata-v4-parser/lib/expressions').commonExpr(new Uint8Array(new Buffer('Items/all(d:d/Quantity gt 100)')), 0);
```


## NPM package
Change the version in your package.json or use npm version <new-version>.
`npm version patch` or `npm version prerelease`

After changing the version number in your package.json, run `npm publish` to publish the new version to NPM.

`npm install` will install the latest version in the NPM repository.

Complete sequence

```
npm run build
<commit changes>
npm version prerelease
git push
git push --tags 
npm publish
```



## TODO

* more unit testing
* use metadata for correct OData identifier type detection (complex types, navigation properties, etc.)
