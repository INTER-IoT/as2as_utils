console.log("parsing proton-get.js");

//var Client = require('node-rest-client').Client;
var rp = require('request-promise'); //request  Promise
var Promise = require("bluebird");

//var url = "http://158.42.34.3:8080";
var url = "http://localhost:8080";
var stream = "/ProtonOnWebServerAdmin/resources/instances/ProtonOnWebServer";
//var client = new Client();



module.exports = function(RED) {
    function protonGET(config) {
        RED.nodes.createNode(this,config);

		 // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);		
        if (this.server) {
			console.log("Waiting input...");			
			var node = this;
			this.on('input', function(msg) {
				var uri_='http://'+this.server.host+':'+this.server.port+'/'+this.server.service;
				console.log(uri_);			
				
				var options = 
					{
						uri: uri_       
					};
								
				rp(options)
					.then(function (response) {
						msg.payload=JSON.stringify(response);
						node.send(msg);
						console.log("Data sent");
					})
					.catch(function (err) { // API call failed...
						node.error(err);
					});										
			});		
			
		}
		else {			
			node.error("Select Remote Server");
			//console.log("Select Remote Server");			
        }
    }
    RED.nodes.registerType("proton-get", protonGET);
}