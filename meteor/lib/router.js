Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Content'); }
});

Router.map(function() {
  this.route('contentView', {
    path: '/'
  });
});