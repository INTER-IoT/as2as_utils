// OVSDB
//' PUT -d '"tcp:127.0.0.1:6632"' http://localhost:8080/v1.0/conf/switches/<id>/ovsdb_addr

const resource="/v1.0/topology/switches";
const addr="tcp:127.0.0.1:6632"
const requestp = require('request-promise');

const node = (RED) => {
  function setBrdige(config) {
      RED.nodes.createNode(this, config);
      this.url = config.url;
      this.id = config.id;

      this.on('input', function(msg){
        console.log("Performing a PUT call " + this.url);
            
        if (this.url){
          var options = {
            method: 'PUT',
            uri: this.url + this.resource + '/' + this. id + '/ovsdb_addr',
            body: {
                some: this.addr
            },
            json: true // Automatically stringifies the body to JSON
          };
          requestp(options).then ((parsedBody) =>{
            msg.payload = parsedBody;
            this.send(msg);
          }).catch((err) =>{
            console.log(err);
          });
        }else{
          console.log("No controller configured")
        };
      });

  }
  RED.nodes.registerType("set-bridge", setBrdige);
}

module.exports = node;