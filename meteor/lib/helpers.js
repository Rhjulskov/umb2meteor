// følgende loades først, da det ligger i lib folderen > ved ikke om det er nødvendigt?

UI.registerHelper('children', function() {
  return Content.find({ Parent: this.UmbId });
});

// Kan man counte på overstående children direkte i spacebars??
UI.registerHelper('childrenCount', function() {
  return Content.find({ Parent: this.UmbId }).count();
});

// Basic date converter
UI.registerHelper('formatTime', function(context, options) {
  if(context){
    return context.getDate()+"/"+ context.getMonth()+"/"+context.getFullYear() 
  }
});