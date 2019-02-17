Middleware translator between IoT platform's data model and INTER-IoT's data model and vice versa

# Installation

Requirements:

- node-red
- java or docker

1- Install the service with:

    java -jar target\MWTranslator-0.0.1-SNAPSHOT-jar-with-dependencies.jar {TCP port}


# Usage

Add a properly configurated server, select an IoT platform of the list and enter a correct message to translate

# Example

## Translator from FIWARE's data model to INTER-IoT's data model

### Input data for FIWARE platform
    {
        "id": "Room1",
        "type": "Room",
        "pressure": {
            "type": "Integer",
            "metadata": {},
            "value": 720
        },
        "temperature": {
            "type": "Float",
            "metadata": {},
            "value": 23
        }
    }

### Ouput data
    {
        "@graph": [
            {
                "@graph": [
                    {
                        "@id": "msg:meta/8bc3b2b8-1037-4664-9c3a-52d77fa2065e",
                        "msg:conversationID": "convc96b1b25-4225-4c95-a4d3-e032b39e9dad",
                        "msg:dateTimeStamp": "2019-01-31T17:50:42.876+01:00",
                        "msg:messageID": "msgbdf03358-e64e-4f16-8af6-1005d7913033",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                            {
                                "@id": "msg:Observation"
                            },
                            {
                                "@id": "msg:meta"
                            }
                        ]
                    }
                ],
                "@id": "msg:metadata"
            },
            {
                "@graph": [
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_0",
                        "InterIoT:syntax/FIWAREv2#hasAttribute": [
                            {
                                "@id": "InterIoT:syntax/FIWAREv2#_1"
                            },
                            {
                                "@id": "InterIoT:syntax/FIWAREv2#_4"
                            }
                        ],
                        "InterIoT:syntax/FIWAREv2#hasId": "Room1",
                        "InterIoT:syntax/FIWAREv2#hasType": "Room",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Entity"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_1",
                        "InterIoT:syntax/FIWAREv2#hasName": "pressure",
                        "InterIoT:syntax/FIWAREv2#hasValue": {
                            "@id": "InterIoT:syntax/FIWAREv2#_2"
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Attribute"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_2",
                        "InterIoT:syntax/FIWAREv2#hasAttrValue": {
                            "@type": "http://www.w3.org/2001/XMLSchema#int",
                            "@value": "720"
                        },
                        "InterIoT:syntax/FIWAREv2#hasMetadata": {
                            "@id": "InterIoT:syntax/FIWAREv2#_3"
                        },
                        "InterIoT:syntax/FIWAREv2#hasType": "Integer"
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_3",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Metadata"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_4",
                        "InterIoT:syntax/FIWAREv2#hasName": "temperature",
                        "InterIoT:syntax/FIWAREv2#hasValue": {
                            "@id": "InterIoT:syntax/FIWAREv2#_5"
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Attribute"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_5",
                        "InterIoT:syntax/FIWAREv2#hasAttrValue": {
                            "@type": "http://www.w3.org/2001/XMLSchema#int",
                            "@value": "23"
                        },
                        "InterIoT:syntax/FIWAREv2#hasMetadata": {
                            "@id": "InterIoT:syntax/FIWAREv2#_6"
                        },
                        "InterIoT:syntax/FIWAREv2#hasType": "Float"
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_6",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Metadata"
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

## Translator from INTER-IoT's data model to FIWARE's data model 

### Input data
    {
        "@graph": [
            {
                "@graph": [
                    {
                        "@id": "msg:meta/8bc3b2b8-1037-4664-9c3a-52d77fa2065e",
                        "msg:conversationID": "convc96b1b25-4225-4c95-a4d3-e032b39e9dad",
                        "msg:dateTimeStamp": "2019-01-31T17:50:42.876+01:00",
                        "msg:messageID": "msgbdf03358-e64e-4f16-8af6-1005d7913033",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
                            {
                                "@id": "msg:Observation"
                            },
                            {
                                "@id": "msg:meta"
                            }
                        ]
                    }
                ],
                "@id": "msg:metadata"
            },
            {
                "@graph": [
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_0",
                        "InterIoT:syntax/FIWAREv2#hasAttribute": [
                            {
                                "@id": "InterIoT:syntax/FIWAREv2#_1"
                            },
                            {
                                "@id": "InterIoT:syntax/FIWAREv2#_4"
                            }
                        ],
                        "InterIoT:syntax/FIWAREv2#hasId": "Room1",
                        "InterIoT:syntax/FIWAREv2#hasType": "Room",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Entity"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_1",
                        "InterIoT:syntax/FIWAREv2#hasName": "pressure",
                        "InterIoT:syntax/FIWAREv2#hasValue": {
                            "@id": "InterIoT:syntax/FIWAREv2#_2"
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Attribute"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_2",
                        "InterIoT:syntax/FIWAREv2#hasAttrValue": {
                            "@type": "http://www.w3.org/2001/XMLSchema#int",
                            "@value": "720"
                        },
                        "InterIoT:syntax/FIWAREv2#hasMetadata": {
                            "@id": "InterIoT:syntax/FIWAREv2#_3"
                        },
                        "InterIoT:syntax/FIWAREv2#hasType": "Integer"
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_3",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Metadata"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_4",
                        "InterIoT:syntax/FIWAREv2#hasName": "temperature",
                        "InterIoT:syntax/FIWAREv2#hasValue": {
                            "@id": "InterIoT:syntax/FIWAREv2#_5"
                        },
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Attribute"
                        }
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_5",
                        "InterIoT:syntax/FIWAREv2#hasAttrValue": {
                            "@type": "http://www.w3.org/2001/XMLSchema#int",
                            "@value": "23"
                        },
                        "InterIoT:syntax/FIWAREv2#hasMetadata": {
                            "@id": "InterIoT:syntax/FIWAREv2#_6"
                        },
                        "InterIoT:syntax/FIWAREv2#hasType": "Float"
                    },
                    {
                        "@id": "InterIoT:syntax/FIWAREv2#_6",
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                            "@id": "InterIoT:syntax/FIWAREv2#Metadata"
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

### Output data for FIWARE platform
    {
        "id": "Room1",
        "type": "Room",
        "pressure": {
            "type": "Integer",
            "metadata": {},
            "value": 720
        },
        "temperature": {
            "type": "Float",
            "metadata": {},
            "value": 23
        }
    }


# License

ASL 2.0 license