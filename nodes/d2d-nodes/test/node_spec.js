var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('inter-iot-gateway-api node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'inter-iot-gateway-api');
            done();
        });
    });

    it('should handle version()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'version',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'getDevice',
                getDevice_deviceUid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle readDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'readDevice',
                readDevice_deviceUid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle writeDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'writeDevice',
                writeDevice_deviceUid: '<node property>', // (1) define node properties
                writeDevice_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle startDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'startDevice',
                startDevice_deviceUid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle stopDevice()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'stopDevice',
                stopDevice_deviceUid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deviceStatus()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'deviceStatus',
                deviceStatus_deviceUid: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle info()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'info',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listDevices()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'listDevices',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle gatewayId()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'gatewayId',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle status()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'status',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle info_1()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'info_1',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle test()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'test',
                test_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listExecutions()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'listExecutions',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addExecution()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'addExecution',
                addExecution_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeExecution()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'removeExecution',
                removeExecution_executionId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listStatements()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'listStatements',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addStatement()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'addStatement',
                addStatement_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeStatement()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'removeStatement',
                removeStatement_statementId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle listRules()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'listRules',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle addRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'addRule',
                addRule_body: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle removeRule()', function (done) {
        var flow = [
            { id: 'n1', type: 'inter-iot-gateway-api', name: 'inter-iot-gateway-api',
                method: 'removeRule',
                removeRule_ruleId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'inter-iot-gateway-api-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
