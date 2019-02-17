console.log("Getting data");

const resource="/v1.0/topology/switches"
const requestp = require('request-promise');


const node = (RED) => {
  function getNodes(config){
    RED.nodes.createNode(this, config);
    this.url = RED.nodes.getNode(config.url);

    this.on('input', function(msg){
      this.url = this.url.url + resource;
      console.log("Performing a GET call " + this.url);
        requestp(this.url).then ((response) =>{
          msg.payload = response;
          this.send(msg);
        }).catch((err) =>{
          console.log(err);
        });

    });
  }
  RED.nodes.registerType("get-nodes", getNodes);
};
module.exports = node;