module.exports = function(node) {

	'use strict';
	var async = require('async');

	var OSLCServer = require('oslc-client');
	var server = new OSLCServer(node.server);
	var OSLCResource = require('oslc-client/OSLCResource')
	require('oslc-client/namespaces')

	var member = null

	async.series([
		function connect(callback) {server.connect(node.userId, node.password, OSLCCM10('cmServiceProviders'), callback);},
		function use(callback) {server.use(node.projectArea, callback);},
		function checkForExisting(callback) {
			server.query({
				where: 'dcterms:title="'+node.title+'"',
			}, function (err, queryBase, results) {
				if (err) return node.error('Unable to read by ID: '+err)
				member = results.any(results.sym(queryBase), RDFS('member'))
				callback(null)
			})
		},
		function create(callback) {
			if (member) {
				node.send({payload: 'Alert *'+node.title+'* already exists, see: '+member.uri})
				callback(null)
				return
			}
			var alert = new OSLCResource()
			alert.setTitle(node.title)
			alert.setDescription(node.description)
			alert.set(RDF('type'), OSLCCM('ChangeRequest'))
			server.create('task', alert, function(err, result) {
				if (err) return node.error('Could not create Alert: '+err)
				// send the input to the output
	            var msg = {payload: result.id.uri}
    	        node.send(msg)
				callback(err, alert)
			});
		},
		function cleanup(callback) {
			server.disconnect()
			callback(null)
		}
	]);
}