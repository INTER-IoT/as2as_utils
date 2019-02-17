/* global RED */

const positionSimu = require('../position-simu');

const node = (RED) => {
  const PositionConfig = function PositionConfig(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.uuid = config.uuid;
    this.file = config.file;
    positionSimu(RED).initOrUpdate(config, (err) => {
      if (err) this.error(err);
    });
  };
  RED.nodes.registerType('position-config', PositionConfig);
};

module.exports = node;
