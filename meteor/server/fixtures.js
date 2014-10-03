


if (Content.find().count() === 0) {
  

  Content.insert(
    getUmbracoNodeObject(1000, "Frontpage", "frontpage", new Date(), new Date(), "/", "1000", -1, 1, "Frontpage", 1, "frontpage", { head: "Welcome to umb2Meteor Starter kit", bodyText: "<p>Lorem ipsum</p>"}) 
  );

  Content.insert(
    getUmbracoNodeObject(1001, "About us", "about-us", new Date(), new Date(), "/about-us", "1000,1001", 1000, 2, "Subpage", 1, "subpage", { head: "About us", bodyText: "<p>Vi hedder Peter og Rasmus :D</p>"}) 
  );

  Content.insert(
    getUmbracoNodeObject(1002, "The project", "the-project", new Date(), new Date(), "/the-project", "1000,1002", 1000, 2, "Subpage", 2, "subpage", { head: "About the umb2Meteor project", bodyText: "<p>Lorem ipsum</p>"}) 
  );

  Content.insert(
    getUmbracoNodeObject(1003, "News", "news", new Date(), new Date(), "/news", "1000,1003", 1000, 2, "Newspage", 3, "newslist", { head: "Project News" }) 
  );

  Content.insert(
    getUmbracoNodeObject(1004, "News Item 1", "news-item-1", new Date(), new Date(), "/news/news-item-1", "1000,1003,1004", 1003, 3, "NewsItem", 1, "newsitem", { head: "News 1", bodyText: "<p>Lorem ipsum 1</p>", newsDate: new Date() }) 
  );

  Content.insert(
    getUmbracoNodeObject(1005, "News Item 2", "news-item-2", new Date(), new Date(), "/news/news-item-2", "1000,1003,1005", 1003, 3, "NewsItem", 2, "newsitem", { head: "News 2", bodyText: "<p>Lorem ipsum 2</p>", newsDate: new Date() }) 
  );

  Content.insert(
    getUmbracoNodeObject(1006, "News Item 3", "news-item-3", new Date(), new Date(), "/news/news-item-3", "1000,1003,1006", 1003, 3, "NewsItem", 3, "newsitem", { head: "News 3", bodyText: "<p>Lorem ipsum 3</p>", newsDate: new Date() }) 
  );

  Content.insert(
    getUmbracoNodeObject(1007, "Contact", "contact", new Date(), new Date(), "/contact", "1000,1007", 1000, 2, "Contact", 4, "contact", { head: "Contact us", bodyText: "<p>Lorem ipsum</p>", contactEmail: "peter@designmonkey.dk" }) 
  );


}


function getUmbracoNodeObject(id, name, urlName, createDate, updateDate, url, path, parentId, level, nodeTypeAlias, sortOrder, templateAlias, properties) {

  var umbNode = {
    Id: id, // UmbID, da Id vel er Mongo ID'et. Kunne ændres til Id, hvis Mongo id er lowercase eller med _id 
    Name: name,
    UrlName: urlName,
    CreateDate: createDate,
    UpdateDate: updateDate,
    Url: url,
    Path: path,
    Level: level,
    NodeTypeAlias: nodeTypeAlias,
    Template: templateAlias, // Umbraco bruger et ID, men så skal vi have en template Collection også, hvor kunne sende Template Alias med, og så matche det med Meteor templates :)
    SortOrder: sortOrder,
    Parent: parentId
  }

  _.extend(umbNode, properties);

  return umbNode;
}


