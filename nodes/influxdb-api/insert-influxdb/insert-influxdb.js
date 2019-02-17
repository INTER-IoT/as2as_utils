var rp = require('request-promise'); 

module.exports = function (RED){
    function insertInfluxdb(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/independentStorage/insert";
            var observation = "";

            if(config.setobservation) observation = JSON.parse(config.observation);
            else observation = msg.payload;

            var _body = {
                "db": config.db,
                "table": config.table,
                "data": {
                    "platformId": config.platformId,
                    "device": config.device,
                    "observation": observation
                }
            };

            msg.body = _body;

            var options = {
                method: 'POST',
                uri: _uri,
                body: JSON.stringify(_body),
                //body: _body,
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
    RED.nodes.registerType("insert-influxdb",insertInfluxdb);
}