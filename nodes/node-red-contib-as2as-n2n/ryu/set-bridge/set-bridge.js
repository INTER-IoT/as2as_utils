

/*
 * Copyright 2016-2018 Universitat Politècnica de València
 * Copyright 2016-2018 Università della Calabria
 * Copyright 2016-2018 Prodevelop, SL
 * Copyright 2016-2018 Technische Universiteit Eindhoven
 * Copyright 2016-2018 Fundación de la Comunidad Valenciana para la 
 * Investigación, Promoción y Estudios Comerciales de Valenciaport
 * Copyright 2016-2018 Rinicom Ltd
 * Copyright 2016-2018 Association pour le développement de la formation 
 * professionnelle dans le transport
 * Copyright 2016-2018 Noatum Ports Valenciana, S.A.U.
 * Copyright 2016-2018 XLAB razvoj programske opreme in svetovanje d.o.o.
 * Copyright 2016-2018 Systems Research Institute Polish Academy of Sciences
 * Copyright 2016-2018 Azienda Sanitaria Locale TO5
 * Copyright 2016-2018 Alessandro Bassi Consulting SARL
 * Copyright 2016-2018 Neways Technologies B.V.
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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