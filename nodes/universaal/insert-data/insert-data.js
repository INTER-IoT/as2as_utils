var rp = require('request-promise'); 

module.exports = function (RED){
    function insertData(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/uaal/spaces/"+config.space+"/context/publishers/"+config.publisher;
            var data;
            
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

            if(config.setdata) data = config.data;
            else data = msg.payload;
            
            // var _body = {
            //     "subscriber": {
            //         "@id": config.id,
            //         "link": {
            //             "@href": "/uaal/spaces/"+config.space+"/context/subscribers/"+config.id,
            //             "@rel": "self"
            //         },
            //         "callback": config.callback,
            //         "pattern": pattern, 
            //     }
            // };

            var options = {
                method: 'POST',
                uri: _uri,
                body: data,
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
    RED.nodes.registerType("insert-data",insertData);
}