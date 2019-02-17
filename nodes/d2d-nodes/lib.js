/*jshint -W069 */
/**
 * Inter-IoT Physical/Virtual Gateway API
 * @class InterIotGatewayApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var InterIotGatewayApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');

    function InterIotGatewayApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name InterIotGatewayApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    InterIotGatewayApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            req.form = form;
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };


/**
 * Get Api version information
 * @method
 * @name InterIotGatewayApi#version
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.version = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/version';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Device Description
 * @method
 * @name InterIotGatewayApi#getDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.getDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Read last device state
 * @method
 * @name InterIotGatewayApi#readDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.readDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}/read';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Write state to device
 * @method
 * @name InterIotGatewayApi#writeDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
     * @param {} parameters.body - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.writeDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}/write';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Connect device
 * @method
 * @name InterIotGatewayApi#startDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.startDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}/start';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Disconnect device
 * @method
 * @name InterIotGatewayApi#stopDevice
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.stopDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}/stop';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get device status
 * @method
 * @name InterIotGatewayApi#deviceStatus
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.deviceUid - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.deviceStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/device/{deviceUid}/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{deviceUid}', parameters['deviceUid']);
        
        


        if(parameters['deviceUid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: deviceUid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get physical gateway information
 * @method
 * @name InterIotGatewayApi#info
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.info = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/physical/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of devices connected to this Gateway
 * @method
 * @name InterIotGatewayApi#listDevices
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.listDevices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/physical/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the physical gateway Id connected
 * @method
 * @name InterIotGatewayApi#gatewayId
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.gatewayId = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/physical/id';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Check the connection status of the physical Gateway
 * @method
 * @name InterIotGatewayApi#status
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.status = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/physical/status';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get virtual gateway information
 * @method
 * @name InterIotGatewayApi#info_1
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.info_1 = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/virtual/info';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Orion subscription endpoint
 * @method
 * @name InterIotGatewayApi#test
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.test = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/orion/notify';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Executions List
 * @method
 * @name InterIotGatewayApi#listExecutions
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.listExecutions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/executions/list';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add Execution
 * @method
 * @name InterIotGatewayApi#addExecution
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.addExecution = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/executions/add';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove Execution
 * @method
 * @name InterIotGatewayApi#removeExecution
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.executionId - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.removeExecution = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/executions/remove/{executionId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{executionId}', parameters['executionId']);
        
        


        if(parameters['executionId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: executionId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Statement List
 * @method
 * @name InterIotGatewayApi#listStatements
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.listStatements = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/statements/list';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add Statement
 * @method
 * @name InterIotGatewayApi#addStatement
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.addStatement = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/statements/add';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove Statement
 * @method
 * @name InterIotGatewayApi#removeStatement
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.statementId - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.removeStatement = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/statements/remove/{statementId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{statementId}', parameters['statementId']);
        
        


        if(parameters['statementId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: statementId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Rule List
 * @method
 * @name InterIotGatewayApi#listRules
 * @param {object} parameters - method options and parameters
 */
 InterIotGatewayApi.prototype.listRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/rules/list';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add Rule
 * @method
 * @name InterIotGatewayApi#addRule
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.addRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/rules/add';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove Rule
 * @method
 * @name InterIotGatewayApi#removeRule
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.ruleId - Inter-IoT Physical/Virtual Gateway API
 */
 InterIotGatewayApi.prototype.removeRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/extensions/rules/rules/remove/{ruleId}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{ruleId}', parameters['ruleId']);
        
        


        if(parameters['ruleId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ruleId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return InterIotGatewayApi;
})();

exports.InterIotGatewayApi = InterIotGatewayApi;
