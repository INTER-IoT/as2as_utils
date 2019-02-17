FIWARE-Orion node

# Usage

* Get one or all the subscriptions
* Delete an existing subscription


# Installation

Requirements:

- node-red
- FIWARE Orion

# Example

## Subscription ID
5c5d67137f13d331cf07f4aa

## Subscription

    {
        "id": "5c5d67137f13d331cf07f4aa",
        "expires": "2019-02-09T11:25:07.00Z",
        "status": "failed",
        "subject": {
            "entities": [
                {
                    "id": "Room1",
                    "type": "Room"
                }
            ],
            "condition": {
                "attrs": [
                    "pressure"
                ]
            }
        },
        "notification": {
            "timesSent": 1,
            "lastNotification": "2019-02-08T11:25:29.00Z",
            "attrs": [],
            "attrsFormat": "legacy",
            "http": {
                "url": "http://158.42.32.79:1880/f6b3d8a78270f"
            },
            "lastFailure": "2019-02-08T11:25:34.00Z",
            "lastFailureReason": "Timeout was reached"
        },
        "throttling": 5
    }


# License

ASL 2.0 license
