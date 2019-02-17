
console.log("Getting data");

const resource="/v1.0/topology/links"
const requestp = require('request-promise');


const node = (RED) => {
  function getLinks(config){
    RED.nodes.createNode(this, config);
    this.url = RED.nodes.getNode(config.url);

    this.on('input', function(msg){

      //Here is the function the node must perform
      if (this.url){
        this.url = this.url.url;
        console.log("Performing a GET call " + this.url + resource);
          requestp(this.url + resource).then ((response) =>{
            msg.payload = response;
            this.send(msg);
          }).catch((err) =>{
            console.log(err);
          });
      }else{
        console.log("No controller configured")
      };
    });
  }
  RED.nodes.registerType("get-links", getLinks);
};
module.exports = node;