
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
            console.log(data);
            console.log(Content.findOne({id: data.Id }));
            if(Content.findOne({id: data.Id }) == undefined) {
                var newId = Content.insert(data);
                this.response.end('Inserted: ' + newId);
            }
            else {

                Content.update({ id: data.Id }, {$set: data}, function(error) {
                  if (error) {
                    this.response.end('Update error: ');    
                  } else {
                    this.response.end('Updated');    
                  }
                });

            }
            // Lav API key checker og sorter API key fra :) 
            // Lav her søg efter Content.find({ id: requestData.id }) og så update eller insert
            //this.response.end('Testing: ' + JSON.stringify(requestData));
            //console.log(requestMethod);
        }
    });
});