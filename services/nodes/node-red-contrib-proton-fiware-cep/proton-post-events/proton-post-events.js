/* global RED */
/* eslint-disable no-param-reassign, no-console, object-shorthand */
const request = require('request');



const node = (RED) => {
  const ProtonPostEvents = function ProtonPostEvents(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.protonConfig);
    const url = `${configNode.baseURL}${config.insname}/rest/events`;

    this.on('input', (msg) => {
    // msg.payload.url=url;
      msg.payload.url = JSON.stringify(url);

     // var contentname = '';
      //console.log(config.contype);
      //if (config.contype == 'Json') {
       // contentname= 'application/json';
     // }

       //   else if (config.contype == 'XML') {
       //   contentname= 'text/xml';
       // } else {
        //  contentname= 'text/plain';
       // }
      // console.log(msg.payload.eventbody);
      // console.log(contentname);




      const options = { method: 'POST',
        url: url,
        headers:
        { 'cache-control': 'no-cache',
          'content-type': config.contype },
        body: msg.payload.eventbody };
   

      console.log(options);
      
      request(options, (err, response, body) => {
       
         msg.payload.response = response.statusCode;
        this.send(msg);
      });
    });
  };
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  RED.nodes.registerType('proton-post-events', ProtonPostEvents);
};

module.exports = node;
