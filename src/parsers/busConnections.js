const { getAttributes, getElAttribs, getAttribsArray } = require('./util');



const getConnections = getAttribsArray('Connection');

const getRoles = (ctx, el) => {
    const groups = ctx
        .xml('Role', el)
        .toArray()
        .map(roleEl => {
            return {
                ...getElAttribs(roleEl),
                connections: getConnections(ctx, roleEl)
            }
        })


    return groups;
};

const parseBusConnection = (ctx, el) => {
    return {
        ...getElAttribs(el),
        roles: getRoles(ctx, el)
    }
}

const parseBusConnections = (ctx) => {
    ctx.lprj.busConnections = ctx
        .xml('BusConnection')
        .toArray()
        .map(layoutEl => parseBusConnection(ctx, layoutEl))
    return ctx;
}
module.exports = parseBusConnections;