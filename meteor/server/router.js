
Router.map(function() {
    this.route('methodExample', {
        path: '/api/umb2Meteor',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var data = this.request.body;
            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'text/html'});

            if(data._umb2MeteorApiKey == "1234567891012345678910123456789101234567891012345678910") {

                delete data._umb2MeteorApiKey;

                if(Content.findOne({id: data.id }) == undefined) {
                    var newId = Content.insert(data);
                    var logText = "Inserted: " + data.name + "("+ data.id +") by "+ data.writerName + " :: " + newId; 
                    this.response.end(logText);
                    console.log(logText);
                }
                else {
                    Content.update({ id: data.id }, {$set: data});
                    var logText = "Updated: " + data.name + "("+ data.id +") by "+ data.writerName + " :: " + data._id; 
                    this.response.end(logText);
                    console.log(logText);
                }
            }
            else {
                this.response.end("Error: Wrong API Key");
                console.log("Error: Wrong API Key")
            }

        }
    });
});