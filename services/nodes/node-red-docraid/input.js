module.exports = function(RED) {
    function Input(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            if (
                !config.clientUrl
                || !config.username
                || !config.password
                || !config.filename
            ) {
                node.error("The DocRaid-input-node configuration is not complete or empty. It needs to be filled. We need the client URL, the username, the password and the wanted filename.");
                return null;
            }

            var createClient = require("webdav");
            var client = createClient(
                config.clientUrl,
                config.username,
                config.password
            );

            client
                .getFileContents(config.filename)
                .then(function(value) {
                    msg.payload = value;
                    node.status({fill:"green",shape:"dot",text:"connected"});
                }, function (reason) {
                    node.error("Couldn't get the wanted data from DocRad here is the reason why: " + reason, msg);
                    node.status({fill:"red",shape:"dot",text:"no connection"});
                })
                .finally(function () {
                    setTimeout(function(){
                        node.status({});
                    }, 1000);
                    node.send(msg);
                });
        });
    }
    RED.nodes.registerType("input",Input);
};