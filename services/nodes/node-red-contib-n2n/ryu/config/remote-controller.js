

const node = (RED) => {
  function RemoteController(config) {
      RED.nodes.createNode(this, config);
      this.url = config.url;      
  }
  RED.nodes.registerType("remote-controller", RemoteController);
}

module.exports = node;