// følgende loades først, da det ligger i lib folderen > ved ikke om det er nødvendigt?

UI.registerHelper('children', function() {
  return Content.find({ parent: this.id });
});

// Kan man counte på overstående children direkte i spacebars??
UI.registerHelper('childrenCount', function() {
  return Content.find({ parent: this.id }).count();
});

// Basic date converter
UI.registerHelper('formatTime', function(context, options) {
  if(context){
  	var thisDate = new Date(context);
	return thisDate.getDate()+"/"+ thisDate.getMonth()+"/"+thisDate.getFullYear() + " " + thisDate.getHours() + ":" + thisDate.getMinutes() + ":" + thisDate.getSeconds()
  }
});

UI.registerHelper("templateIs", function(template) {
	return this.template === template;
});

UI.registerHelper("nodeTypeIs", function(nodeType) {
	return this.nodeTypeAlias === nodeType;
});


log = function(str) {
	console.log(str);
}

// Bruges til at console.logge koden til ens fixtures :) 
createFixtures = function() {
  Content.find().forEach(function(node) {
  	var insertNode = node;
  	delete node._id;
  	console.log("Content.insert(" + JSON.stringify(insertNode) + ");");
  })
}


