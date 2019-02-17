var rp = require('request-promise');
module.exports = function (RED){
    function getAlignments(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var options = {
                method: 'GET',
                uri: "http://"+this.server.host+":"+this.server.port+"/alignments",
                headers: {
                    'Accept': 'application/json',
                }	
            };
            //console.log(_body);

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
    RED.nodes.registerType("get-alignments",getAlignments);
}