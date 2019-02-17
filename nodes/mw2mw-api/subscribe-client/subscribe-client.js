var rp = require('request-promise');
module.exports = function (RED){
    function subscribeClient(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;

        var _body = {
            "deviceIds": [config.clientIds]
        };
        
        node.on("input", (msg)=>{
            var options = {
                method: 'POST',
                uri: "http://"+this.server.host+":"+this.server.port+"/api/mw2mw/subscriptions",
                body: JSON.stringify(_body),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Client-ID': config.clientID
                }	
            };;

            rp(options)
                .then(function (response) {
                    msg.payload=response;
                    node.send(msg);
                })
                .catch(function (err) {
                    node.error(err);
                });	
        });
    }
    RED.nodes.registerType("subscribe-client",subscribeClient);
}