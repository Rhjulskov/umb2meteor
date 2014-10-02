
Router.map(function() {
    this.route('methodExample', {
        path: '/api/umb2Meteor',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            console.log(requestData);
            this.response.end('Testing: ' + JSON.stringify(requestData));
            console.log(requestMethod);
        }
    });
});