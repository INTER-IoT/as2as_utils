var rp = require('request-promise'); 

module.exports = function (RED){
    function getSubscriptions(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;

        console.log("subscriptionId   "+config.subscriptionId);
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/v2/subscriptions/"+config.subscriptionId;

            var options = {
                method: 'GET',
                uri: _uri,
                headers: {
                    'Accept': 'application/json'
                }	
            };

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
    RED.nodes.registerType("get-subscriptions",getSubscriptions);
}