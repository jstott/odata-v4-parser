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
- `$filter=status eq 'Active'`

**Inequality Check**

- `$filter=price ne 19.99`
- `$filter=category ne 'Electronics'`
- `$filter=status ne null`

**Greater Than / Less Than**

- `$filter=price gt 19.99`
- `$filter=price lt 50.00`
- `$filter=price ge 19.99`
- `$filter=price le 50.00`
- `$filter=quantity ge 100 and quantity le 1000`

**Logical Operators**

- `$filter=price gt 19.99 and price lt 50.00`
- `$filter=category eq 'Books' or category eq 'Electronics'`
- `$filter=not (status eq 'Inactive')`
- `$filter=(isActive eq true) and (price lt 100 or discount gt 0.1)`

**Null Checks**

- `$filter=category is null`
- `$filter=category is not null`
- `$filter=category is nullOrEmpty`
- `$filter=description is nullOrEmpty or description eq ''`

**String Functions**

- `$filter=startswith(name, 'A')`
- `$filter=endswith(name, 'Z')`
- `$filter=contains(description, 'discount')`
- `$filter=contains(partName, 'PO # 5')` - with special characters
- `$filter=substringof('micro', name)`
- `$filter=indexof(name, 'soft') eq 5`
- `$filter=length(name) gt 10`
- `$filter=tolower(category) eq 'books'`
- `$filter=toupper(status) eq 'ACTIVE'`
- `$filter=trim(name) eq 'Product'`
- `$filter=concat(firstName, lastName) eq 'JohnDoe'`

**Arithmetic Operations**

- `$filter=price add 5 eq 24.99`
- `$filter=price sub 5 eq 14.99`
- `$filter=price mul 2 eq 39.98`
- `$filter=price div 2 eq 9.99`
- `$filter=price mod 5 eq 4.99`
- `$filter=quantity mul price gt 1000`

**Date and Time Functions**

- `$filter=date eq 2023-01-01`
- `$filter=date gt 2023-01-01`
- `$filter=date lt 2023-12-31`
- `$filter=year(dateCreated) eq 2023`
- `$filter=month(dateCreated) eq 12`
- `$filter=day(dateCreated) eq 25`
- `$filter=hour(timestamp) eq 14`
- `$filter=minute(timestamp) eq 30`
- `$filter=second(timestamp) eq 45`
- `$filter=date(timestamp) eq 2023-01-01`
- `$filter=time(timestamp) eq 14:30:00`

**Math Functions**

- `$filter=round(price) eq 20`
- `$filter=floor(price) eq 19`
- `$filter=ceiling(price) eq 20`

**Type Functions**

- `$filter=isof(category, 'Edm.String')`
- `$filter=cast(rating, 'Edm.Decimal') gt 4.5`

**Boolean Functions**

- `$filter=isActive eq true`
- `$filter=isActive eq false`
- `$filter=isDeleted ne true`

**Collection/Lambda Operators**

- `$filter=tags/any(t: t eq 'featured')`
- `$filter=tags/all(t: t ne 'deprecated')`
- `$filter=items/any(i: i/quantity gt 100)`
- `$filter=items/all(i: i/price lt 1000)`
- `$filter=orders/any(o: o/total gt 500 and o/status eq 'Completed')`

**Navigation Properties**

- `$filter=category/name eq 'Electronics'`
- `$filter=supplier/address/city eq 'Seattle'`
- `$filter=order/customer/name eq 'John Doe'`

**Expand and Select**

- `$expand=category`
- `$expand=category,supplier`
- `$expand=category($select=name,description)`
- `$expand=orders($filter=status eq 'Pending')`
- `$expand=orders($orderby=date desc;$top=5)`
- `$select=name,price,category`
- `$select=*`

**OrderBy**

- `$orderby=name`
- `$orderby=name desc`
- `$orderby=category asc, price desc`
- `$orderby=date desc, name asc`

**Top and Skip**

- `$top=10`
- `$skip=20`
- `$top=5&$skip=10`
- `$orderby=date desc&$top=10`

**Count**

- `$count=true`
- `$filter=price gt 10&$count=true`

**Search**

- `$search=laptop`
- `$search=laptop OR tablet`
- `$search=laptop AND sale`
- `$search=NOT discontinued`

**Complex Expressions**

- `$filter=(price gt 19.99 and price lt 50.00) or (category eq 'Books' and isActive eq true)`
- `$filter=(startswith(name, 'A') or endswith(name, 'Z')) and price le 100.00`
- `$filter=contains(tolower(name), 'microsoft') and (price gt 50 or discount gt 0.2)`
- `$filter=year(dateCreated) eq 2023 and month(dateCreated) ge 6 and status ne 'Archived'`
- `$filter=orders/any(o: o/items/any(i: i/price gt 100 and i/quantity ge 5))`

**Combined Query Options**

- `$filter=price gt 10&$orderby=price desc&$top=10&$skip=5`
- `$filter=category eq 'Electronics'&$expand=supplier&$select=name,price`
- `$filter=isActive eq true&$orderby=name&$count=true&$top=20`
- `$search=laptop&$filter=price lt 1000&$orderby=rating desc`



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
