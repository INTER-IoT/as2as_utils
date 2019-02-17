Inter Platform Semantic Mediator API

# Usage

1- Get all the alignments, select one and take its name and version

2- Select one IoT platfrom from the mwtranslator's list and input a correct message to translate to INTER-IoT's data model

3- Configure the POST translation node with the alignment's name and version


# Installation

# Example

## Alignment

    {
        "name": "UniversAAL_CO_align",
        "sourceOntologyURI": "http://ontology.universAAL.org/Context.owl#",
        "description": "ADDED user data - Alignment between UniversAAL messages with context events and INTER-IoT central ontology.",
        "creator": "SRIPAS",
        "targetOntologyURI": "http://inter-iot.eu/GOIoTPex#",
        "version": "3.0.1",
        "id": 1,
        "date": 1545046716356,
        "descId": "[UniversAAL_CO_align] [3.0.1] : http://ontology.universAAL.org/Context.owl# -> http://inter-iot.eu/GOIoTPex#"
    }

## UniversAAL message

    @prefix ns: <http://ontology.universaal.org/PhThing.owl#> .
    @prefix ns1: <http://ontology.universAAL.org/Context.owl#> .
    @prefix ns2: <http://ontology.universaal.org/Measurement.owl#> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix owl: <http://www.w3.org/2002/07/owl#> .
    @prefix ns3: <http://ontology.universaal.org/HealthMeasurement.owl#> .
    @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix ns4: <http://ontology.universAAL.org/Device.owl#> .
    @prefix : <http://ontology.universAAL.org/InterIoT.owl#> .
    <urn:org.universAAL.middleware.context.rdf:ContextEvent#_:9e2aa729ac420ba3:171d>
    ns1:hasProvider :interHEALTHbpub ;
    a ns1:ContextEvent ;
    rdf:subject :sensor  ;
    ns1:hasTimestamp "1418143637251"^^xsd:long ;
    rdf:predicate ns4:hasValue ;
    rdf:object :bp .
    :bpsys a ns2:Measurement ;
    ns2:value "22.2"^^xsd:float .
    ns1:gauge a ns1:ContextProviderType .
    :sensor  a <http://ontology.universAAL.org/PersonalHealthDevice.owl#BloodPressureSensor> ,
        ns:Device ,
        ns:PhysicalThing ;
    ns4:hasValue :bp .
    :interHEALTHbpub a ns1:ContextProvider ;
    ns1:hasType ns1:gauge ;
    ns1:myClassesOfEvents [
        a ns1:ContextEventPattern ;
        <http://www.w3.org/2000/01/rdf-schema#subClassOf> [
            a owl:Restriction ;
            owl:allValuesFrom <http://ontology.universAAL.org/PersonalHealthDevice.owl#BloodPressureSensor> ;
            owl:onProperty rdf:subject
            ]
        ] .
    :bpdias a ns2:Measurement ;
    ns2:value "11.1"^^xsd:float .
    :bp ns3:diastolicBloodPreassure :bpdias ;
    a ns3:BloodPressure ,
        ns3:HealthMeasurement ;
    ns3:systolicBloodPreassure :bpsys .

## Output data

    {
        "message": "Message translation successful",
        "graphStr": {
            "@graph": [
            {
                "@graph": [
                {
                    "@id": "msg:meta/a808b6ec-9f33-4bcc-ba24-07ab6356b8b6",
                    "msg:conversationID": "conv1f3232bc-aa68-4da5-8d79-e29d40194ad6",
                    "msg:dateTimeStamp": "2019-02-04T10:49:51.286+01:00",
                    "msg:messageID": "msg60d17590-df58-4a12-833b-d3706514e9e2",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "@id": "msg:meta"
                    },
                    {
                        "@id": "msg:Observation"
                    }
                    ]
                }
                ],
                "@id": "msg:metadata"
            },
            {
                "@graph": [
                {
                    "@id": "_:b0",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://ontology.universAAL.org/Context.owl#ContextEventPattern"
                    },
                    "http://www.w3.org/2000/01/rdf-schema#subClassOf": {
                    "@id": "_:b1"
                    }
                },
                {
                    "@id": "_:b1",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://www.w3.org/2002/07/owl#Restriction"
                    },
                    "http://www.w3.org/2002/07/owl#allValuesFrom": {
                    "@id": "http://ontology.universAAL.org/PersonalHealthDevice.owl#BloodPressureSensor"
                    },
                    "http://www.w3.org/2002/07/owl#onProperty": {
                    "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#subject"
                    }
                },
                {
                    "@id": "_:b2",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://www.w3.org/2006/time#Instant"
                    },
                    "http://www.w3.org/2006/time#inTimePosition": {
                    "@id": "_:b3"
                    }
                },
                {
                    "@id": "_:b3",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://www.w3.org/2006/time#TimePosition"
                    },
                    "http://www.w3.org/2006/time#numericPosition": {
                    "@type": "http://www.w3.org/2001/XMLSchema#decimal",
                    "@value": "1418143637251"
                    }
                },
                {
                    "@id": "http://ontology.universAAL.org/Context.owl#gauge",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://ontology.universAAL.org/Context.owl#ContextProviderType"
                    }
                },
                {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#bp",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "@id": "http://ontology.universaal.org/HealthMeasurement.owl#HealthMeasurement"
                    },
                    {
                        "@id": "sosa:Sensor"
                    },
                    {
                        "@id": "iiot:IoTDevice"
                    }
                    ]
                },
                {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#bpdias",
                    "iiot:hasValue": {
                    "@type": "http://www.w3.org/2001/XMLSchema#float",
                    "@value": "11.1"
                    },
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "@id": "sosa:Result"
                    },
                    {
                        "@id": "InterIoT:medex#DiastolicBloodPressure"
                    },
                    {
                        "@id": "http://ontology.universaal.org/Measurement.owl#Measurement"
                    }
                    ]
                },
                {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#bpsys",
                    "iiot:hasValue": {
                    "@type": "http://www.w3.org/2001/XMLSchema#float",
                    "@value": "22.2"
                    },
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "@id": "sosa:Result"
                    },
                    {
                        "@id": "InterIoT:medex#SystolicBloodPressure"
                    },
                    {
                        "@id": "http://ontology.universaal.org/Measurement.owl#Measurement"
                    }
                    ]
                },
                {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#interHEALTHbpub",
                    "http://ontology.universAAL.org/Context.owl#hasType": {
                    "@id": "http://ontology.universAAL.org/Context.owl#gauge"
                    },
                    "http://ontology.universAAL.org/Context.owl#myClassesOfEvents": {
                    "@id": "_:b0"
                    },
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                    {
                        "@id": "sosa:Platform"
                    },
                    {
                        "@id": "InterIoT:medex#Gauge"
                    }
                    ]
                },
                {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#sensor",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "http://ontology.universAAL.org/PersonalHealthDevice.owl#BloodPressureSensor"
                    },
                    "sosa:isHostedBy": {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#interHEALTHbpub"
                    }
                },
                {
                    "@id": "urn:org.universAAL.middleware.context.rdf:ContextEvent#_:9e2aa729ac420ba3:171d",
                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    "@id": "sosa:Observation"
                    },
                    "sosa:hasResult": [
                    {
                        "@id": "http://ontology.universAAL.org/InterIoT.owl#bpdias"
                    },
                    {
                        "@id": "http://ontology.universAAL.org/InterIoT.owl#bpsys"
                    }
                    ],
                    "sosa:madeBySensor": {
                    "@id": "http://ontology.universAAL.org/InterIoT.owl#sensor"
                    },
                    "sosa:phenomenonTime": {
                    "@id": "_:b2"
                    }
                }
                ],
                "@id": "msg:payload"
            }
            ],
            "@context": {
            "msg": "http://inter-iot.eu/message/",
            "iiotex": "http://inter-iot.eu/GOIoTPex#",
            "geosparql": "http://www.opengis.net/ont/geosparql#",
            "iiot": "http://inter-iot.eu/GOIoTP#",
            "InterIoT": "http://inter-iot.eu/",
            "ssn": "http://www.w3.org/ns/ssn/",
            "sosa": "http://www.w3.org/ns/sosa/"
            }
        }
    }





# License

ASL 2.0 license