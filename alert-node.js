module.exports = function(RED) {
    var createAlert = require('./createAlert')
    function RTCAlertNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.server = config.server;
        node.projectArea = config.projectArea;
        node.userId = config.userId;
        node.password = config.password;
        node.title = config.title;
        node.description = config.description;
        node.on('input', function(msg) {
        	// Create the RTC Alert and send the output
            createAlert(node)
        });
    }
    RED.nodes.registerType("RTC-alert", RTCAlertNode);
}