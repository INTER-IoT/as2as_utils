/* global RED */
const node = (RED) => {
  const ProtonConfig = function ProtonConfig(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.protocol = config.protocol;
    this.host = config.host;
    this.port = config.port;
    this.baseURL = `${this.protocol}://${this.host}:${this.port}`;
  };
  RED.nodes.registerType('proton-config', ProtonConfig);
};

module.exports = node;
