module.exports = function(RED) {
    function orionServer(n){
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("orion-server",orionServer);
}