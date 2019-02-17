module.exports = function(RED) {
    function influxdbServer(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("influxdb-server",influxdbServer);
}