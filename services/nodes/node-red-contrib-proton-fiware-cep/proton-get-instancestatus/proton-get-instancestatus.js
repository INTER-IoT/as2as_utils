/* global RED */
/* eslint-disable no-param-reassign, no-console */
const request = require('request');



const node = (RED) => {
  const ProtonGetInstanceStatus = function ProtonGetInstanceStatus(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.protonConfig);
    const url = `${configNode.baseURL}/ProtonOnWebServerAdmin/resources/instances${config.insname}`;
  
  
   this.on('input', (msg) => {
   
    
  // msg.payload.url=url;
   msg.payload={url:JSON.stringify(url)};




request(url, (err, response, body) => {
  //if (err) this.error() // o algo asi
  //msg.payload.body = JSON.parse(body);
   msg.payload.body = body;
   msg.payload.body.state = body.state;
   msg.payload.body.definitionsurl = body.definitions-url;
   msg.payload.response = response;
  // msg.payload.response = JSON.parse(response);
  this.send(msg);

});

     
    });
  };
  RED.nodes.registerType('proton-get-instancestatus', ProtonGetInstanceStatus);
};

module.exports = node;
