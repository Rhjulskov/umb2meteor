/*
   // Similar to above: find all pages with document type umbNewsItem under the news overview page
    // Then order them, first by publishDate (a property the editor can explicitly set on the news item)
    // and then by createDate, which is set by Umbraco automatically when a page gets created.
    var newsItems = newsOverview.umbNewsItems.OrderBy("publishDate desc, createDate desc").Take(5);
*/
Template.umbnewsoverview.helpers({
  newsItem: function(){ 
    return Content.find({nodeTypeAlias: "umbNewsItem"}, {sort: {createDate: -1 ,publishDate: -1}}, {limit: 5});
  }
});
