// følgende loades først, da det ligger i lib folderen > ved ikke om det er nødvendigt?

UI.registerHelper('rootChildren', function() {
  var root = Content.findOne({level: 1, niceUrl: "/" });
  if(root != undefined) {
    return Content.find({ parent: root.id }, { sort: { sortOrder : 1 } });
  }
  else {
    return null;
  }
});

UI.registerHelper('isCurrentPage', function(urlPath) {
  return location.pathname == urlPath;
});


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


// https://gist.github.com/TastyToast/5053642
UI.registerHelper ('truncate', function (str, len) {
  if (str.length > len && str.length > 0) {
      var new_str = str + " ";
      new_str = str.substr (0, len);
      new_str = str.substr (0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

      return new Handlebars.SafeString ( new_str +'...' ); 
  }
  return str;
});

UI.registerHelper('recursive', function(val) {
  if(val){
    var current = Content.findOne({ id: this.id }); 
    while(!current[val] && current["parent"].length != 4){
      current = Content.findOne({ id: current["parent"] }); 
    }
    return current[val];
  }
});

UI.registerHelper('stringOrDefault', function(i, j){
  if(i){
    return i
  } else {
    return j
  }
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


