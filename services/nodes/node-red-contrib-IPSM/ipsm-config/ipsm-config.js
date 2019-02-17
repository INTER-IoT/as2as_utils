module.exports = function(RED) {

	/*
	Configuration node for IPSM producers and consumers
	*/
	
    function KafkaBrokerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
		this.useSSL = n.useSSL;
    }
    RED.nodes.registerType("kafka-broker", KafkaBrokerNode);
}