Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Content'); }
});

Router.map(function() {
  this.route('contentView', {
    path: '/',
    template: 'contentView'
  });
  this.route('newsitem', {
    path: '/news/:_id',
    template: 'newsitem',
    data: function() { return Content.findOne(this.params._id);   }
  });
});
