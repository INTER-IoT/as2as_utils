module.exports = function(RED) {
    function universaalServer(n){
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.username = n.username;
        this.password = n.password;
        //this.credentials = n.credentials;
    }
    RED.nodes.registerType("universaal-server",universaalServer);
}