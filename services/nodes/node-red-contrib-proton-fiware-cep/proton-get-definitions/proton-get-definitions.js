/* global RED */
/* eslint-disable no-param-reassign, no-console */
const request = require('request');



const node = (RED) => {
  const ProtonGetDefinitions = function ProtonGetDefinitions(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.protonConfig);
    const url = `${configNode.baseURL}/ProtonOnWebServerAdmin/resources/definitions${config.reqtype !== 'ALL' ? config.defname : ''}`;
  
  
   this.on('input', (msg) => {
   
    
  // msg.payload.url=url;
   msg.payload={url:JSON.stringify(url)};




request(url, (err, response, body) => {
  //if (err) this.error() // o algo asi
  //msg.payload.body = JSON.parse(body);
   msg.payload.body = body;
   msg.payload.response = response;
  // msg.payload.response = JSON.parse(response);
  this.send(msg);

});

     
    });
  };
  RED.nodes.registerType('proton-get-definitions', ProtonGetDefinitions);
};

module.exports = node;
