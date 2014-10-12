Template.umblatestnewswidget.helpers({
  newsItems: function(){
    return Content.find({nodeTypeAlias: "umbNewsItem"});
  },
  newsOverview: function(){
    return Content.findOne({nodeTypeAlias: "umbNewsOverview"});
  }
});