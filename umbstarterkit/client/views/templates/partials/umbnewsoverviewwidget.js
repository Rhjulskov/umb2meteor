/* var homePage = CurrentPage.AncestorsOrSelf(1).First();
 var newsOverview = homePage.umbNewsOverviews.First();
 var newsItems = newsOverview.umbNewsItems.OrderBy("publishDate desc, createDate desc").Take(5);
 var pageTitle = string.IsNullOrWhiteSpace(newsOverview.Title)
        ? newsOverview.Name
        : newsOverview.Title;
var featuredNewsItem = newsItems.First();
var featuredNewsItemTitle = string.IsNullOrWhiteSpace(featuredNewsItem.Title) 
        ? featuredNewsItem.Name 
        : featuredNewsItem.Title;
var featuredNewsItemDateTime = featuredNewsItem.PublishDate == default(DateTime) 
        ? featuredNewsItem.CreateDate 
        : featuredNewsItem.PublishDate;
*/

Template.umbnewsoverviewwidget.helpers({
  newsOverview: function(){ 
    return Content.findOne({nodeTypeAlias: "umbNewsOverview"});
  },
  featuredNewsItem: function(){
    return Content.findOne({nodeTypeAlias: "umbNewsItem", id: 1077});
  }
});
