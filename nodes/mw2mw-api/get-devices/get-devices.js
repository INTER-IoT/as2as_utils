var rp = require('request-promise');
module.exports = function (RED){
    function getPlatforms(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var options = {
                method: 'GET',
                uri: "http://"+this.server.host+":"+this.server.port+"/api/mw2mw/platforms",
                headers: {
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
    RED.nodes.registerType("get-platforms",getPlatforms);
}