var rp = require('request-promise'); 

module.exports = function (RED){
    function postTranslation(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/translation";
            var _graphStr="";

            if(config.setdata){
                _graphStr = config.data;
            } else {
                _graphStr = msg.payload;
            }

            var _body = {
                "alignIDs": [
                    {
                        "name": config.alignIDname,
                        "version": config.alignIDversion
                    }
                ],
                "graphStr": _graphStr
            };

            var options = {
                method: 'POST',
                uri: _uri,
                body: JSON.stringify(_body),
                headers: {
                    'Content-Type': 'application/json',
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
    RED.nodes.registerType("post-translation",postTranslation);
}