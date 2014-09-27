// Kunne godt tænke mig at finde en måde at gøre denne her global på alle content, så man ikke skal skrive den i hver template.js fil :) 
Template.newslist.children = function() {
	return Content.find({ Parent: 1003 });
}
