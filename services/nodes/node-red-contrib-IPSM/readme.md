## Prerequisities

npm install no-kafka

## Testing a node module locally

To test a node module locally, the npm link command can be used. This allows you to develop the node in a local directory and have it linked into a local node-red install, as if it had been npm installed.

* in the directory containing the node's package.json file, run: sudo npm link.
* in your node-red user directory, typically ~/.node-red run: npm link <name of node module>.

This creates the appropriate symbolic links between the two directories so Node-RED will discover the node when it starts. Any changes to the node's file can be picked up by simply restarting Node-RED.

## node-red-contrib-IPSM

### Nodes

* ipsm-inject-rdf - helper node for debugging to paste RDF to be sent to IPSM
* ipsm-in - node for sending RDF messages to IPSM (encapsulated Kafka producer); configuration includes Kafka broker (host and port) and topic(s) to which the message will be published
* ipsm-out - node for reading RDF messages from IPSM (encapsulated Kafka consumer); configuration includes Kafka broker (host and port) and topic from which the message will be consumed

Kafka Broker configuration has "use SSL" flag, by default set to TRUE. The IPSM used for integration has SSL enabled, for local tests this setting can be changed to FALSE (in case of IPSM-Kafka deployments without SSL enabled).

### Resources

IPSM uses Kafka with SSL endpoint enabled, therefore in this directory client private key and certificate are stored. They are dynamically read by nodes when creating producers and consumers.


### Samples

Here, sample flows exported from Node-RED will be placed.

* BabyIPSMTest-flow - contains three flows configured for Baby IPSM deployed and configured on SRIPAS test server. Each flow realizes one scenario described in
[Hands-on semantics workshop - example data for semantic producers/consumers](https://bitbucket.org/szmejap/ipsm-workshop-doc/src/ff5e8a3dc246ac6cdaa8d5f6f0554b0975a1e118/Example_scenarios.md). Clicking on the "whatever" inject node will run the flow, that in the last step will log the translated message to the debug console.


