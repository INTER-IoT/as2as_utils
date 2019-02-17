/*
 * Copyright 2016-2018 Universitat Politècnica de València
 * Copyright 2016-2018 Università della Calabria
 * Copyright 2016-2018 Prodevelop, SL
 * Copyright 2016-2018 Technische Universiteit Eindhoven
 * Copyright 2016-2018 Fundación de la Comunidad Valenciana para la 
 * Investigación, Promoción y Estudios Comerciales de Valenciaport
 * Copyright 2016-2018 Rinicom Ltd
 * Copyright 2016-2018 Association pour le développement de la formation 
 * professionnelle dans le transport
 * Copyright 2016-2018 Noatum Ports Valenciana, S.A.U.
 * Copyright 2016-2018 XLAB razvoj programske opreme in svetovanje d.o.o.
 * Copyright 2016-2018 Systems Research Institute Polish Academy of Sciences
 * Copyright 2016-2018 Azienda Sanitaria Locale TO5
 * Copyright 2016-2018 Alessandro Bassi Consulting SARL
 * Copyright 2016-2018 Neways Technologies B.V.
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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