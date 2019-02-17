module.exports = function(RED) {
    function Output(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            if (
                !config.clientUrl
                || !config.username
                || !config.password
                || !config.filename
            ) {
                node.error("The DocRaid-output-node configuration is not complete or empty. It needs to be filled. We need the client URL, the username, the password and the wanted filename.", msg);
                return null;
            }

            var createClient = require("webdav");
            var client = createClient(
                config.clientUrl,
                config.username,
                config.password
            );

            var testStream = client.createWriteStream('connection_test');

            testStream.end('Test connection.','UTF8');

            client.getFileContents('/connection_test').then(function(value) {
                node.status({fill:"green",shape:"dot",text:"connected"});
            }, function (reason) {
                node.error("Connection not established. Here the reason why: " + reason, msg);
                node.status({fill:"red",shape:"dot",text:"no connection"});
            });
            client.deleteFile('connection_test');

            var writeStream = client.createWriteStream(config.filename);

            writeStream.write(msg.payload,'UTF8');
            writeStream.end();
        });
    }

    RED.nodes.registerType("output",Output);
};