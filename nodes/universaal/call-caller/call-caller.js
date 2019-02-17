var rp = require('request-promise'); 

module.exports = function (RED){
    function callCaller(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/uaal/spaces/"+config.space+"/service/callers/"+config.caller;
            var serviceRequest;
            
            if (this.server.username || this.server.password){
                var auth = Buffer.from(this.server.username+":"+this.server.password).toString('base64'); //Base64 encoding
                var _headers = {
                    'Content-Type': 'text/plain',
                    'Authorization': 'Basic '+auth
                }
            }else{
                var _headers = {
                    'Content-Type': 'text/plain'
                }
            }
            
            if(config.setserviceRequest) serviceRequest = config.serviceRequest;
            else serviceRequest = msg.payload;

            var options = {
                method: 'POST',
                uri: _uri,
                body: serviceRequest,
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
    RED.nodes.registerType("call-caller",callCaller);
}