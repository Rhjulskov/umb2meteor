Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  //waitOn: function() { return Meteor.subscribe('Content'); }
});

Router.map(function() {

  // Call publish content node
  this.route('meteorApiPublishNode', {
    path: '/umb2MeteorApi/publishNode',
    where: 'server',
    action: function() {
      var data = this.request.body;
      var thisResponse = this;
      thisResponse.response.writeHead(200, {'Content-Type': 'text/html'});
      Meteor.call('publishNode', data, function (error, result) {
        if(error) {
          thisResponse.response.end("Error: " + error.reason);
          return;
        }
        thisResponse.response.end(result);
      });
    }
  });

  // Call delete content node
  this.route('meteorApiDeleteNode', {
    path: '/umb2MeteorApi/deleteNode',
    where: 'server',
    action: function() {
      var data = this.request.body;
      console.log(data);
      var thisResponse = this;
      thisResponse.response.writeHead(200, {'Content-Type': 'text/html'});
      Meteor.call('deleteNode', data, function (error, result) {
        if(error) {
          thisResponse.response.end("Error: " + error.reason);
          return;
        }
        thisResponse.response.end(result);
      });
    }
  });  

  // Call publish media node
  this.route('meteorApiPublishMedia', {
    path: '/umb2MeteorApi/publishMedia',
    where: 'server',
    action: function() {
      var data = this.request.body;
      var thisResponse = this;
      thisResponse.response.writeHead(200, {'Content-Type': 'text/html'});
      Meteor.call('publishMedia', data, function (error, result) {
        if(error) {
          thisResponse.response.end("Error: " + error.reason);
          return;
        }
        thisResponse.response.end(result);
      });
    }
  });

  // Call delete media node
  this.route('meteorApiDeleteMedia', {
    path: '/umb2MeteorApi/deleteMedia',
    where: 'server',
    action: function() {
      var data = this.request.body;
      var thisResponse = this;
      thisResponse.response.writeHead(200, {'Content-Type': 'text/html'});
      Meteor.call('deleteMedia', data, function (error, result) {
        if(error) {
          thisResponse.response.end("Error: " + error.reason);
          return;
        }
        thisResponse.response.end(result);
      });
    }
  });    


  // Root Level 1
  this.route('frontpage', {
    path: '/',
    template: 'frontpage',
    data: function() { 
      return Content.findOne({ niceUrl: "/" });   
    },
    waitOn: function() {
      Meteor.subscribe('media');
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
  this.route('level4', {
    path: '/:_level2/:_level3/:_level4/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 5
  this.route('level5', {
    path: '/:_level2/:_level3/:_level4/:_level5/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4, this.params._level5];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });
  // Level 6
  this.route('level6', {
    path: '/:_level2/:_level3/:_level4/:_level5/:_level6/',
    template: 'contentView',
    data: function() { 
      var urlArr = [this.params._level2, this.params._level3, this.params._level4, this.params._level5, this.params._level6];
      var searchUrl = "/"+ urlArr.join("/") + "/";
      return Content.findOne({ niceUrl: searchUrl });   
    }
  });



});

