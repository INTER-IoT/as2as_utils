var rp = require('request-promise'); 

module.exports = function (RED){
    function selectQueryInfluxdb(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/independentStorage/select";

            var _body = {
                "db": config.db,
                "table": config.table,
                "query": config.query
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
    RED.nodes.registerType("select-query-influxdb",selectQueryInfluxdb);
}