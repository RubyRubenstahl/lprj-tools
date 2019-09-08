var camelCase = require('change-case').camelCase;


const getAttribsArray = tagName => (ctx, el) => {
    const attributes = ctx
        .xml(tagName, el)
        .toArray()
        .map(getElAttribs);

    return attributes;
};
module.exports.getAttribsArray = getAttribsArray;

const getAttributes = (ctx, el) => {
    const attributes = ctx
        .xml('Attribute', el)
        .toArray()
        .reduce((attributes, attrEl) => {
            const name = camelCase(attrEl.attribs.Name);
            const val = attrEl.attribs.Value;
            attributes[name] = val;
            return attributes
        }, {});
    return attributes;
};
module.exports.getAttributes = getAttributes;


const getElAttribs = (el) => {
    const attributes = Object.keys(el.attribs)
        .reduce((attributes, key) => {
            const name = camelCase(key);
            attributes[name] = el.attribs[key]
            return attributes
        }, {});
    return attributes;
};
module.exports.getElAttribs = getElAttribs;