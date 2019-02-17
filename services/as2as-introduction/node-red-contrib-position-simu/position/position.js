/* global RED */

const positionSimu = require('../position-simu');

const node = (RED) => {
  const Position = function Position(config) {
    RED.nodes.createNode(this, config);
    const simu = positionSimu(RED).getSimu(config);
    simu.on('position', (position) => {
      const msg = {};
      msg.payload = {};
      msg.payload.location = { lat: position.lat, lon: position.lon };
      msg.payload.data = position.data;
      this.send(msg);
    });
  };
  RED.nodes.registerType('position', Position);
};

module.exports = node;
