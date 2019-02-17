var rp = require('request-promise'); 

module.exports = function (RED){
    function createSubscriber(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/uaal/spaces/"+config.space+"/context/subscribers";
            var pattern;
            
            if (this.server.username || this.server.password){
                var auth = Buffer.from(this.server.username+":"+this.server.password).toString('base64'); //Base64 encoding
                var _headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+auth
                }
            }else{
                var _headers = {
                    'Content-Type': 'application/json'
                }
            }

            if(config.setpattern) pattern = config.pattern;
            else pattern = msg.payload;
            
            var _body = {
                "subscriber": {
                    "@id": config.subscriberId,
                    "link": {
                        "@href": "/uaal/spaces/"+config.space+"/context/subscribers/"+config.subscriberId,
                        "@rel": "self"
                    },
                    "callback": config.callback,
                    "pattern": pattern, 
                }
            };

            var options = {
                method: 'POST',
                uri: _uri,
                body: JSON.stringify(_body),
                headers: _headers	
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
    RED.nodes.registerType("create-subscriber",createSubscriber);
}