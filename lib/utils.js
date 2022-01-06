"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils;
(function (Utils) {
    function stringify(value, index, next) {
        return Array.prototype.map.call(value.slice(index, next), function (ch) { return String.fromCharCode(ch); }).join("");
    }
    Utils.stringify = stringify;
    function matches(value, index, next, regex) {
        let str = Utils.stringify(value, index, next);
        if (str) {
            let matches = str.match(regex);
            if (matches && matches.length > 0)
                return matches[1];
        }
        return null;
    }
    Utils.matches = matches;
    function is(value, compare) {
        for (let i = 0; i < compare.length; i++) {
            if (value === compare.charCodeAt(i))
                return true;
        }
        return false;
    }
    Utils.is = is;
    function equals(value, index, compare) {
        let i = 0;
        while (value[index + i] === compare.charCodeAt(i) && i < compare.length) {
            i++;
        }
        return i === compare.length ? i : 0;
    }
    Utils.equals = equals;
    function required(value, index, comparer, min, max) {
        let i = 0;
        max = max || (value.length - index);
        while (i < max && comparer(value[index + i])) {
            i++;
        }
        return i >= (min || 0) && i <= max ? index + i : 0;
    }
    Utils.required = required;
})(Utils = exports.Utils || (exports.Utils = {}));
exports.default = Utils;
//# sourceMappingURL=utils.js.map