const { getAttributes, getElAttribs } = require('./util');

const parseDevice = (ctx, deviceEl) => {
    return {
        ...getElAttribs(deviceEl),
        attributes: getAttributes(ctx, deviceEl),
        busInterfaces: parseBusInterfaces(ctx, deviceEl)
    }
}

const parseBusInterfaces = (ctx, el) => {
    const busInterfaces = ctx
        .xml('BusInterface', el)
        .toArray()
        .map(busEl => {
            busInterface = {
                ...getElAttribs(busEl)
            }
            return busInterface
        }, {});
    return busInterfaces;
};


const parseDevices = (ctx) => {
    ctx.lprj.devices = ctx
        .xml('Device')
        .toArray()
        .map(deviceEl => parseDevice(ctx, deviceEl))
    return ctx;
}

module.exports = parseDevices;