"use strict";
var lib = require('./lib.js');

module.exports = function (RED) {
    function InterIotGatewayApiNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;

        this.getDevice_deviceUid = config.getDevice_deviceUid;
        this.getDevice_deviceUidType = config.getDevice_deviceUidType || 'str';
        this.readDevice_deviceUid = config.readDevice_deviceUid;
        this.readDevice_deviceUidType = config.readDevice_deviceUidType || 'str';
        this.writeDevice_deviceUid = config.writeDevice_deviceUid;
        this.writeDevice_deviceUidType = config.writeDevice_deviceUidType || 'str';
        this.writeDevice_body = config.writeDevice_body;
        this.writeDevice_bodyType = config.writeDevice_bodyType || 'str';
        this.startDevice_deviceUid = config.startDevice_deviceUid;
        this.startDevice_deviceUidType = config.startDevice_deviceUidType || 'str';
        this.stopDevice_deviceUid = config.stopDevice_deviceUid;
        this.stopDevice_deviceUidType = config.stopDevice_deviceUidType || 'str';
        this.deviceStatus_deviceUid = config.deviceStatus_deviceUid;
        this.deviceStatus_deviceUidType = config.deviceStatus_deviceUidType || 'str';
        this.test_body = config.test_body;
        this.test_bodyType = config.test_bodyType || 'str';
        this.addExecution_body = config.addExecution_body;
        this.addExecution_bodyType = config.addExecution_bodyType || 'str';
        this.removeExecution_executionId = config.removeExecution_executionId;
        this.removeExecution_executionIdType = config.removeExecution_executionIdType || 'str';
        this.addStatement_body = config.addStatement_body;
        this.addStatement_bodyType = config.addStatement_bodyType || 'str';
        this.removeStatement_statementId = config.removeStatement_statementId;
        this.removeStatement_statementIdType = config.removeStatement_statementIdType || 'str';
        this.addRule_body = config.addRule_body;
        this.addRule_bodyType = config.addRule_bodyType || 'str';
        this.removeRule_ruleId = config.removeRule_ruleId;
        this.removeRule_ruleIdType = config.removeRule_ruleIdType || 'str';

        var node = this;

        node.on('input', function (msg) {
            var client = new lib.InterIotGatewayApi({ domain: this.service.host });


            client.body = msg.payload;

            var result;
            var errorFlag = false;
            if (node.method === 'version') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.version(parameters);
            }

            if (node.method === 'getDevice') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.getDevice_deviceUid;
                nodeParamType = node.getDevice_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.getDevice(parameters);
            }

            if (node.method === 'readDevice') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.readDevice_deviceUid;
                nodeParamType = node.readDevice_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.readDevice(parameters);
            }

            if (node.method === 'writeDevice') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.writeDevice_deviceUid;
                nodeParamType = node.writeDevice_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                if (typeof msg.payload === 'object') {
                    parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', '
                             + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                
                result = client.writeDevice(parameters);
            }

            if (node.method === 'startDevice') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.startDevice_deviceUid;
                nodeParamType = node.startDevice_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.startDevice(parameters);
            }

            if (node.method === 'stopDevice') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.stopDevice_deviceUid;
                nodeParamType = node.stopDevice_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.stopDevice(parameters);
            }

            if (node.method === 'deviceStatus') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.deviceStatus_deviceUid;
                nodeParamType = node.deviceStatus_deviceUidType;
                parameters.deviceUid = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.deviceStatus(parameters);
            }

            if (node.method === 'info') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.info(parameters);
            }

            if (node.method === 'listDevices') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.listDevices(parameters);
            }

            if (node.method === 'gatewayId') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.gatewayId(parameters);
            }

            if (node.method === 'status') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.status(parameters);
            }

            if (node.method === 'info_1') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.info_1(parameters);
            }

            if (node.method === 'test') {
                var parameters = [], nodeParam, nodeParamType;

                if (typeof msg.payload === 'object') {
                    parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', '
                             + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                
                result = client.test(parameters);
            }

            if (node.method === 'listExecutions') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.listExecutions(parameters);
            }

            if (node.method === 'addExecution') {
                var parameters = [], nodeParam, nodeParamType;

                if (typeof msg.payload === 'object') {
                    parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', '
                             + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                
                result = client.addExecution(parameters);
            }

            if (node.method === 'removeExecution') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.removeExecution_executionId;
                nodeParamType = node.removeExecution_executionIdType;
                parameters.executionId = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.removeExecution(parameters);
            }

            if (node.method === 'listStatements') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.listStatements(parameters);
            }

            if (node.method === 'addStatement') {
                var parameters = [], nodeParam, nodeParamType;

                if (typeof msg.payload === 'object') {
                    parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', '
                             + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                
                result = client.addStatement(parameters);
            }

            if (node.method === 'removeStatement') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.removeStatement_statementId;
                nodeParamType = node.removeStatement_statementIdType;
                parameters.statementId = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.removeStatement(parameters);
            }

            if (node.method === 'listRules') {
                var parameters = [], nodeParam, nodeParamType;

                result = client.listRules(parameters);
            }

            if (node.method === 'addRule') {
                var parameters = [], nodeParam, nodeParamType;

                if (typeof msg.payload === 'object') {
                    parameters.body = msg.payload;
                } else {
                    node.error('Unsupported type: \'' + (typeof msg.payload) + '\', '
                             + 'msg.payload must be JSON object or buffer.', msg);
                    errorFlag = true;
                }
                
                result = client.addRule(parameters);
            }

            if (node.method === 'removeRule') {
                var parameters = [], nodeParam, nodeParamType;

                nodeParam = node.removeRule_ruleId;
                nodeParamType = node.removeRule_ruleIdType;
                parameters.ruleId = nodeParamType === 'str' ? nodeParam || '' : RED.util.getMessageProperty(msg, nodeParam);
                
                result = client.removeRule(parameters);
            }

            if (!errorFlag) {
                node.status({ fill: "blue", shape: "dot", text: "InterIotGatewayApi.status.requesting" });
                result.then(function (response) {
                    if (response.body !== null && response.body !== undefined) {
                        msg.payload = response.body;
                    }
                    node.send(msg);
                    node.status({});
                }).catch(function (error) {
                    node.error(error, msg);
                    node.status({ fill: "red", shape: "ring", text: "node-red:common.status.error" });
                });
            }
        });
    }

    RED.nodes.registerType("inter-iot-gateway-api", InterIotGatewayApiNode);

    function InterIotGatewayApiServiceNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;

    }

    RED.nodes.registerType("inter-iot-gateway-api-service", InterIotGatewayApiServiceNode, {
        credentials: {
            temp: { type: "text" }
        }
    });
};
