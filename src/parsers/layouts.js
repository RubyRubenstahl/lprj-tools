const { getAttributes, getElAttribs } = require('./util');

const getItems = (ctx, el) => {
    const attributes = ctx
        .xml('Item', el)
        .toArray()
        .map(getElAttribs);

    return attributes;
};

const getGroups = (ctx, el) => {
    const groups = ctx
        .xml('Group', el)
        .toArray()
        .map(getElAttribs);

    return groups;
};

const parseLayout = (ctx, layoutEl) => {
    return {
        ...getElAttribs(layoutEl),
        items: getItems(ctx, layoutEl),
        groups: getGroups(ctx, layoutEl)
    }
}

const parseLayouts = (ctx) => {
    ctx.lprj.layouts = ctx
        .xml('Layout')
        .toArray()
        .map(layoutEl => parseLayout(ctx, layoutEl))
    return ctx;
}
module.exports = parseLayouts;