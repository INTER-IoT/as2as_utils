module.exports = function(RED) {

    /*
    Node for consuming messages from IPSM source topics (output communcation channels) 
    */

    function IPSMOutNode(config) {

        RED.nodes.createNode(this,config);
        var node = this;
        var kafka = require('no-kafka');

        this.server = RED.nodes.getNode(config.server);
        
		var kafkaBroker = "";

        if (this.server) {
			var useSSL = this.server.useSSL;
        
            this.log("Kafka broker configuration: " + this.server.host + ":" + this.server.port + ", use SSL " + useSSL);
			
            kafkaBroker = this.server.host + ":" + this.server.port;
			
			var topic = config.topic;
			
			try {
			   
				process.chdir( __dirname );
			    var consumer = null;
				
				if (useSSL == true) {
					consumer = new kafka.SimpleConsumer({connectionString: kafkaBroker,
					ssl: {
						cert: '../resources/client.crt',
						key: '../resources/client.key'
					}});
				} else {
					consumer = new kafka.SimpleConsumer({connectionString: kafkaBroker});
				}
	 
				node.log("Consumer created...");
				node.status({fill:"green",shape:"dot",text:"connected to " + kafkaBroker});
				 
				var dataHandler = function (messageSet, topic, partition) {
					messageSet.forEach(function (m) {
						console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
						node.send(m.message.value.toString('utf8'));
					});
				};
				 
				return consumer.init().then(function () {
					return consumer.subscribe(topic, dataHandler);
				});

			}
			catch(err) {
				node.error(err);
				node.status({fill: "red", shape: "dot", text: err.message});
			}
        } else {
            node.status({fill: "red", shape: "dot", text: err.message});
			node.error("Select Kafka broker");
        }
    }

    RED.nodes.registerType("ipsm-out", IPSMOutNode);
};