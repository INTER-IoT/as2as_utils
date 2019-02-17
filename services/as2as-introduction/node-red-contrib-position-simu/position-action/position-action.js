/* global RED */

const positionSimu = require('../position-simu');

const node = (RED) => {
  const PositionAction = function PositionAction(config) {
    RED.nodes.createNode(this, config);

    const simu = positionSimu(RED).getSimu(config);

    this.on('input', (msg) => {
      simu[config.action]((err) => {
        if (err) {
          this.error(err);
          return;
        }
        this.send(msg);
      });
    });
  };
  RED.nodes.registerType('position-action', PositionAction);
};

module.exports = node;
