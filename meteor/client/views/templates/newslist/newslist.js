// Kunne godt tænke mig at finde en måde at gøre denne her global på alle content, så man ikke skal skrive den i hver template.js fil :) 
Template.newslist.helpers({
  children: function() {
	 return Content.find({ Parent: 1003 });
  },
  newsCount: function(){
    return Content.find({ Parent: 1003 }).count();
  }
});
