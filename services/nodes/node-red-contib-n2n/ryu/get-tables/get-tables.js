console.log("Getting data");

const resource="/stats/table"
const requestp = require('request-promise');


const node = (RED) => {
  function getTables(config){
    RED.nodes.createNode(this, config);
    this.url = RED.nodes.getNode(config.url);
    this.id = config.id;

    this.on('input', function(msg){
      this.url = this.url.url + resource + '/' + this.id;
      console.log("Performing a GET call " + this.url);
        requestp(this.url).then ((response) =>{
          msg.payload = response;
          this.send(msg);
        }).catch((err) =>{
          console.log(err);
        });

    });
  }
  RED.nodes.registerType("get-tables", getTables);
};
module.exports = node;