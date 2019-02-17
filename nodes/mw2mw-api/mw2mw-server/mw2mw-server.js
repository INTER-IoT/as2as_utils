module.exports = function(RED) {
    function mw2mwServer(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("mw2mw-server",mw2mwServer);
}