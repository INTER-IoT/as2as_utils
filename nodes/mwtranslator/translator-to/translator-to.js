var rp = require('request-promise'); //request  Promise
//console.log("iniciando...")

module.exports = function (RED){
    function translatorTo(config){
        RED.nodes.createNode(this, config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);

        var node = this;
        
        node.on("input", (msg)=>{
            var _uri = "http://"+this.server.host+":"+this.server.port+"/formatx/"+config.iotplatform;
            //console.log(_uri);

            var _body = "";
            if(config.setdata) _body = config.data;
            else _body =JSON.stringify(msg.translate);

            //console.log(config.setdata);

            var options = {
                method: 'POST',
                uri: _uri,
                body: _body ,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }	
            };
            //console.log(_body);

            rp(options)
                .then(function (response) {
                    msg.payload=response;
                    node.send(msg);
                    //console.log("Data sent");
                })
                .catch(function (err) { // API call failed...
                    node.error(err);
                });	
        });
    }
    RED.nodes.registerType("translator-to",translatorTo);
}