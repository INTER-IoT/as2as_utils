### **NODE-RED**


**DOCUMENTATION**

Node-red Page: https://nodered.org/
Node-red Official Documentation: https://nodered.org/docs/
More Documentation to understand the tool: http://noderedguide.com/

**Introduction**

Video:

https://www.youtube.com/watch?v=vYreeoCoQPI

### **INSTALLATION AND RUNNING**


**HOW TO INSTALL NODE-RED**


Before installing Node-RED in a Linux or Windows Machine, you must have a working installation of Node.js. It is recommend the use of [Node.js LTS 8.x.](http://https://nodejs.org/en/download/)

Installation command:

 - Linux: `$ sudo npm install -g --unsafe-perm node-red`
 - Windows: `npm install -g --unsafe-perm node-red`

*More Information about the installation:*

In a Linux Machine:

https://nodered.org/docs/getting-started/installation

In a Windows Machine:

https://nodered.org/docs/platforms/windows

Other Alternatives: Deploy Node-red using a Docker Container:

https://nodered.org/docs/platforms/docker

**We strongly suggest to use linux**

**RUNNING NODE-RED**

If you have installed Node-RED as a global npm package, you can use the node-red command:

`$ node-red`

You can then access the Node-RED editor by pointing your browser at http://localhost:1880.

More Information: https://nodered.org/docs/getting-started/running

**USAGE OF FLOWS**

Examples of creation of flows:

https://nodered.org/docs/getting-started/first-flow
https://nodered.org/docs/getting-started/second-flow

**ADD MORE NODES**

Node-RED comes with a core set of useful nodes, but there are a growing number of additional nodes available for install from both the Node-RED project as well as the wider community.

https://nodered.org/docs/getting-started/adding-nodes


### **INTER-IOT EXAMPLE**

**USE THE INTER-IOT EXAMPLE NODE**

Install the node available in the folder "node-red-contrib-position-simu". For that, download this repository and enter the following command from the root of this repository:

 - `npm install -g node-red-contrib-position-simu`

You can find a flow to use as example of the use of this node in the file "flowexample.txt"

### **CREATION OF NEW NODES**

You can use the code of the "node-red-contrib-position-simu" node as example to develop a new set of nodes. But there are different ways to create nodes. The official documentation provided by Node-RED is the following link: https://nodered.org/docs/creating-nodes/







