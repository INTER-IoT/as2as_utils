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
