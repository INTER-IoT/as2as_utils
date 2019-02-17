module.exports = function(RED) {

    /*
    Sample node for injecting RDF messages
    */

    function InjectRDFNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var newMsg = msg;
            newMsg.payload = config.msg;
            node.send(newMsg);
        });
        
        this.on('close', function() {
        	this.log("IPSM-inject-RDF closed");
        } );
    }
    RED.nodes.registerType("ipsm-inject-rdf", InjectRDFNode);
}