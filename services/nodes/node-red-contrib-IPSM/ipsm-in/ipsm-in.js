module.exports = function(RED) {

    /*
    Node for publishing messages to IPSM source topics (input communcation channels) 
    */
    
    function IPSMInNode(config) {

        RED.nodes.createNode(this,config);
        
        var node = this;
        var topics = config.topics;
		
        var kafka = require('no-kafka');
        
        this.server = RED.nodes.getNode(config.server);
		
        var kafkaBroker = "";
		
        if (this.server) {
			var useSSL = this.server.useSSL;
			
            this.log("Kafka broker configuration: " + this.server.host + ":" + this.server.port + ", use SSL " + useSSL);
			
            kafkaBroker = this.server.host + ":" + this.server.port;
				
			process.chdir( __dirname );
			var producer = null;
			if (useSSL == true) {
				producer = new kafka.Producer({connectionString: kafkaBroker,
				ssl: {
					cert: '../resources/client.crt',
						key: '../resources/client.key'
					}});
			 } else {
				 producer = new kafka.Producer({connectionString: kafkaBroker});
			 }
		
			try {
				this.on("input", function(msg) {

					var payloads = [];
					var topicArr = topics.split(',');

					if (topicArr.length > 1) {
						for (i = 0; i < topicArr.length; i++) {
							payloads.push({topic: topicArr[i], messages: msg.payload});
						}
					}
					else {
						payloads = [{topic: topics, messages: msg.payload}];
					}
					
					producer.init().then(function(){
					  producer.send({
						  topic: topics,
						  partition: 0,
						  message: {
							  value: msg.payload
						  }
					  });
					});

				});
			}
			catch(err) {
				node.error(err);
				node.status({fill: "red", shape: "dot", text: err.message});
			}
       
			node.status({fill:"green", shape:"dot", text:"connected to " + kafkaBroker});
        } else {
			node.status({fill: "red", shape: "dot", text: err.message});
			node.error("Select Kafka broker");
        }

		
    }

    RED.nodes.registerType("ipsm-in", IPSMInNode);
}