console.log("parsing proton-remote-server.js");
module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
		this.service = n.service;
    }
    RED.nodes.registerType("proton-remote-server",RemoteServerNode);
}