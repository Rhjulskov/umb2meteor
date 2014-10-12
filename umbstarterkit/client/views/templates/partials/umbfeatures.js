Template.umbfeatures.helpers({
  feature: function(){
    return Content.find({nodeTypeAlias: "umbTextPage"});
  }
});