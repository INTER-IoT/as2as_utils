InfluxDB API

# Usage

One node for each API's method:

* Create a new database
* Delete an existing database
* Select query
* Delete query
* Insert observation


# Installation

Requirements:

- node-red
- java or docker

1- Install the service with:

    mvn clean compile assembly:single

    java -jar target/dataLake-0.0.1-SNAPSHOT-jar-with-dependencies.jar


# Example

## SELECT query

    SELECT * FROM measures

## DELETE query

    DELETE FROM measures

## INSERT observation

    {
        "@graph": [
            {
                "@graph": [
                {
                    "@id": "InterIoTMsg:meta308c3987-b69e-4672-890b-3f3d6229596d",
                    "@type": [
                    "InterIoTMsg:meta",
                    "InterIoTMsg:Observation"
                    ],
                    "InterIoTMsg:conversationID": "conv85e0f5d2-cf65-4d23-84b1- ff1381ae01fc",
                    "InterIoTMsg:dateTimeStamp": "2017-05-08T13:48:19.428+02:00",
                    "InterIoTMsg:messageID": "msg204d0405-a6da-4054-a6db-96d20c413746"
                }
                ],
                "@id": "InterIoTMsg:metadata"
            },
            {
                "@graph": [
                {
                    "@id": "_:b0",
                    "@type": "http://www.w3.org/2006/time#TimePosition",
                    "http://www.w3.org/2006/time#numericPosition": {
                    "@type": "xsd:decimal",
                    "@value": "1418143893015"
                    }
                },
                {
                    "@id": "_:b3",
                    "@type": "owl:Restriction",
                    "owl:allValuesFrom": {
                    "@id": "http://ontology.universAAL.org/PersonalHealthDevice.owl#HeartRateSensor"
                    },
                    "owl:onProperty": {
                    "@id": "rdf:subject"
                    }
                },
                {
                    "@id": "ns1:hr",
                    "@type": [
                    "http://www.w3.org/ns/sosa/Result",
                    "ns3:HeartRate"
                    ],
                    "InterIoT:GOIoTP#hasValue": {
                    "@type": "xsd:int",
                    "@value": "33"
                    }
                },
                {
                    "@id": "urn:org.universAAL.middleware.context.rdf:ContextEvent#_:9e2aa729ac420ba3:182a",
                    "@type": "http://www.w3.org/ns/sosa/Observation",
                    "http://www.w3.org/ns/sosa/hasResult": {
                    "@id": "ns1:hr"
                    },
                    "http://www.w3.org/ns/sosa/madeBySensor": {
                    "@id": "ns1:hrs"
                    },
                    "http://www.w3.org/ns/sosa/phenomenonTime": {
                    "@id": "_:b1"
                    }
                }
                ],
                "@id": "InterIoTMsg:payload"
            }
        ],
        "@context": {
            "ns": "http://ontology.universaal.org/PhThing.owl#",
            "owl": "http://www.w3.org/2002/07/owl#",
            "InterIoTMsg": "http://inter-iot.eu/message/",
            "InterIoTInst": "http://inter-iot.eu/inst/",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "InterIoT": "http://inter-iot.eu/",
            "ns2": "http://ontology.universaal.org/Measurement.owl#",
            "ns1": "http://ontology.universAAL.org/SimpleHealthclient.owl#",
            "ns4": "http://ontology.universAAL.org/Device.owl#",
            "ns3": "http://ontology.universaal.org/HealthMeasurement.owl#"
        }
        
    }



# License

ASL 2.0 license
