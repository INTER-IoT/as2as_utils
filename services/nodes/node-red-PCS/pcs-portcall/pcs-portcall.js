console.log("Loading pcs-portcall.js");

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
			var portcall = msg.payload.portCallNumber; //Read from JSON
						
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
						'<a:Action s:mustUnderstand="1">urn:PublicWebService/GetVesselPortCallInfo</a:Action>' +
						'<a:MessageID>urn:uuid:7c425d8b-89bd-4eb8-aff1-c33c3c7365a3</a:MessageID>' +
						'<a:ReplyTo>' +
							'<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>' +
						'</a:ReplyTo>' +
						'<a:To s:mustUnderstand="1">http://www.valenciaportpcs.net/portcalls/WebServices/Public</a:To>' +
					'</s:Header>' +
                    '<s:Body>' +
                        '<GetVesselPortCallInfo>' +
                            '<portCallNumber>' + portcall + '</portCallNumber>' +
                        '</GetVesselPortCallInfo>' +
                    '</s:Body>' +
                '</s:Envelope>';

			/// Handle response
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        //console.log(xmlhttp.responseText);
						
						/// Convert text to XML
						var doc = new DOMParser().parseFromString(xmlhttp.responseText);
						var PCSresponse = doc.getElementsByTagName('GetVesselPortCallInfoResult');
						//console.log(PCSresponse[0].firstChild.nodeValue);
						
						///Convert XML to JSON
						var jsonText = jsonParser.toJson(PCSresponse[0].firstChild.nodeValue);
						var jsonResponse = JSON.parse(jsonText);
						//console.log(jsonResponse);
						
						///Adapt response
						delete(msg.payload.portCallNumber);
						msg.payload.portCall = jsonResponse.Result;
						node.send(msg.payload);
						console.log(dateFormat(new Date(), 'yy-mm-dd hh:MM:ss') + " - Message GetVesselPortCallInfo correctly received");
						//console.log(msg.payload);
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
    RED.nodes.registerType("pcs-portcall", pcsPortcall);
}




