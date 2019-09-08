
const fs = require('fs');
const parseLprj = require('../src/parse-lprj');
const lprjData = fs.readFileSync('data/sampleshow.lprj', 'utf8');

const show = parseLprj(lprjData);
const lprj = show.lprj;


test('creates patch object', () => {
    expect(show.patch).toBeObject();
});


test('lprj devices', () => {

    expect(lprj.devices).toBeArray();

    expect(lprj.devices.length).toBeGreaterThan(0)

    const device = lprj.devices[0];
    expect(device).toBeObject();
    expect(device.id).toBeString();
    expect(device.attributes).toBeObject();
    expect(device.busInterfaces).toBeArray();


});

test('lprj rgb fixtures', () => {
    const fixture = lprj.devices.find(device => device.type === "RGB Fader");
    expect(fixture.busInterfaces[0].type === "DMX In");
    expect(fixture.attributes.startAddress).toBeString();
})

test('lprj layouts', () => {
    expect(lprj.layouts).toBeArray();

    expect(lprj.layouts.length).toBeGreaterThan(0)

    const layout = lprj.layouts[0];
    expect(layout).toBeObject();
    expect(layout.name).toBeString();

    const item = layout.items[0];
    expect(item.posX).toBeString();


    const group = layout.groups[0];
    expect(group.name).toBeString();
})

test('lprj bus connections', () => {
    expect(lprj.busConnections).toBeArray();

    expect(lprj.busConnections.length).toBeGreaterThan(0)

    const busConnection = lprj.busConnections[0];
    expect(busConnection).toBeObject();
    expect(busConnection.type).toBeString();

    expect(busConnection.roles).toBeArray();

    expect(busConnection.roles[0].name).toEqual("Master");
    expect(busConnection.roles[0].connections[0].port).toEqual("DMX 1");
});