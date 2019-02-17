
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

console.log("Loading pcs-search.js");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;
var jsonParser = require('xml2json');
var dateFormat = require('dateformat');
    
var url = "http://www.valenciaportpcs.net/portcalls/WebServices/Public?WSDL";

module.exports = function(RED) {
    function pcsPortcall(config) {
        RED.nodes.createNode(this,config);

		 /// Retrieve the config node
        this.server = RED.nodes.getNode(config.server);		
        		
		this.on('input', function(msg) {  //From the previous node
			
			var node = this;
			var inputData = msg.payload; //Read from JSON
						
			///Send SOAP message
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('POST', url, true);
					
			/// Build SOAP request
            var soapRequest =
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<s:Envelope ' + 
                    'xmlns:s="http://www.w3.org/2003/05/soap-envelope" ' +
                    'xmlns:a="http://www.w3.org/2005/08/addressing">' +
                    '<s:Header>' +
						'<a:Action s:mustUnderstand="1">urn:PublicWebService/SearchVesselPortCalls</a:Action>' +
						'<a:MessageID>urn:uuid:7c425d8b-89bd-4eb8-aff1-c33c3c7365a3</a:MessageID>' +
						'<a:ReplyTo>' +
							'<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>' +
						'</a:ReplyTo>' +
						'<a:To s:mustUnderstand="1">http://www.valenciaportpcs.net/portcalls/WebServices/Public</a:To>' +
					'</s:Header>' +
                    '<s:Body>' +
                        '<SearchVesselPortCalls>' +
                            '<dateFrom>' + inputData.dateFrom + '</dateFrom>' +
							'<dateTo>' + inputData.dateTo + '</dateTo>' +
							'<vesselName>' + inputData.vesselName + '</vesselName>' +
							'<portOfValencia>' + inputData.portOfValencia + '</portOfValencia>' +
							'<portOfGandia>' + inputData.portOfGandia + '</portOfGandia>' +
							'<portOfSagunto>' + inputData.portOfSagunto + '</portOfSagunto>' +
							'<statusPRV>' + inputData.statusPRV + '</statusPRV>' +
							'<statusOPE>' + inputData.statusOPE + '</statusOPE>' +
							'<statusAUT>' + inputData.statusAUT + '</statusAUT>' +
							'<statusFIN>' + inputData.statusFIN + '</statusFIN>' +
                        '</SearchVesselPortCalls>' +
                    '</s:Body>' +
                '</s:Envelope>';
			
			/// Handle response
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
                        //console.log(xmlhttp.responseText);
						
						/// Convert text to XML
						var doc = new DOMParser().parseFromString(xmlhttp.responseText);
						var PCSresponse = doc.getElementsByTagName('SearchVesselPortCallsResult');
						//console.log(PCSresponse[0].firstChild.nodeValue);
						
						///Convert XML to JSON
						var jsonText = jsonParser.toJson(PCSresponse[0].firstChild.nodeValue);
						var jsonResponse = JSON.parse(jsonText);
						//console.log(jsonResponse.SearchResults);
						
						///Adapt response
						if(jsonResponse.SearchResults.Result != null){
							var response = "";
							node.send(jsonResponse.SearchResults.Result);
							console.log(dateFormat(new Date(), 'yy-mm-dd hh:MM:ss') + " - Message SearchVesselPortCalls correctly received");						
						}
						else{
							node.send("There are not results");
							console.log("There are not results");
						}
						
                    }
					else{
						node.error("Error with the message to the PCS. Code: " + xmlhttp.status);
					}
                }
            }
			
            /// Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'application/soap+xml');
            xmlhttp.send(soapRequest);		
		
		});		
		
    }
    RED.nodes.registerType("pcs-search", pcsPortcall);
}




