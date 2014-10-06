Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Content'); }
});

Router.map(function() {

   this.route('meteorApi', {
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


  // Root Level 1
  this.route('contentView', {
    path: '/',
    template: 'contentView',
    data: function() { 
      return Content.findOne({ niceUrl: "/" });   
    }
  });
  // Level 2
  this.route('level2', {
    path: '/:_level2/',
    template: 'contentView',
    data: function() { 
      var searchUrl = "/"+ this.params._level2 + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 3
  this.route('level3', {
    path: '/:_level2/:_level3/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 4
  this.route('level3', {
    path: '/:_level2/:_level3/:_level4/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 5
  this.route('level3', {
    path: '/:_level2/:_level3/:_level4/:_level5/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4, this.params._level5];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 6
  this.route('level3', {
    path: '/:_level2/:_level3/:_level4/:_level5/:_level6/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4, this.params._level5, this.params._level6];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });



});

