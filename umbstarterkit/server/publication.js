// subscribe to a collection
Meteor.publish('content', function(){
  return Content.find();
});

/*
Meteor.publish('currentPage', function(){
  return Content.find({});
});
*/