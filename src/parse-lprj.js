const cheerio = require('cheerio');
const R = require('ramda')

const parseDevices = require('./parsers/devices')
const parseLayouts = require('./parsers/layouts')
const parseBusConnections = require('./parsers/busConnections');


const runParsers = R.compose(
    parseDevices,
    parseLayouts,
    parseBusConnections
);


function parseLprj(lprjData) {
    const xml = cheerio.load(lprjData, {
        xmlMode: true
    })

    const context = { xml, lprj: {}, patch: {} }

    return runParsers(context);
}
module.exports = parseLprj;