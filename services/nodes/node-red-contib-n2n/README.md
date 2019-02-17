# node-red-contrib-n2n

This package provides nodes to retrieve information from the Network Interoperability Layer.
Concretely, the nodes included in this contribution obtain the information from the network controller (RYU),
in order to have an overview of the network status.

## USAGE

First step is so configure the address (URL) of the controller that manages the virtual network through the `config` node. In this case a `by default` address is set
to perform testing (`http://sdn-network.inter-iot.eu`) but this can be configured as convenient. Then, network information can be gathered through the other nodes. Node characteristics:

 - **config**: to configure the address of the SDN controller.
 - **get-nodes**: to retrieve information about the switches that compose the network.
 - **get-links**: to retrieve information about the link that communicates the nodes.
 - **get-ports**: to retrieve information about the ports of the nodes.
 - **get-tables**: to retrieve information about the table configuration within nodes.
 - **get-flows**: to retrieve information about the OpenFlows flows installed within nodes.
 - **set-bridge**: configuration node to access de OVSDB database. (*Used for further nodes*)

 