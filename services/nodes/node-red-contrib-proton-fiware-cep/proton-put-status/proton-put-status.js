/* global RED */
/* eslint-disable no-param-reassign, no-console, object-shorthand */
const request = require('request');



const node = (RED) => {
  const ProtonPutStatus = function ProtonPutStatus(config) {
    RED.nodes.createNode(this, config);
    const configNode = RED.nodes.getNode(config.protonConfig);
    const url = `${configNode.baseURL}/ProtonOnWebServerAdmin/resources/instances${config.insname}`;

    this.on('input', (msg) => {
    // msg.payload.url=url;
      msg.payload = { url: JSON.stringify(url) };


      const options = { method: 'PUT',
        url: url,
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/json'
        },
        body: {
          action: 'ChangeState',
          state: config.action,
        },
        json: true,
      };
      console.log(options);
      request(options, (err, response, body) => {
  // if (err) this.error() // o algo asi
  // msg.payload.body = JSON.parse(body);
  // msg.payload.body = body;
   // msg.payload.response = response;
  // msg.payload.response = JSON.parse(response);
  // this.send(msg);
// if (error) throw new Error(error);
        msg.payload.response = response.status;
        this.send(msg);
      });
    });
  };
  RED.nodes.registerType('proton-put-status', ProtonPutStatus);
};

module.exports = node;
