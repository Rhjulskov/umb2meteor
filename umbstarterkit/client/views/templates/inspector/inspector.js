Template.inspector.helpers({
  content: function(){
    return Content.find();
  }
});

Template.inspector.rendered = function(){

  var current = function(){
    return Content.findOne({ niceUrl: "/" });   
       
  };
  $("#devInspector").html( current );
  console.log(current)
};

Template.inspector.events({
  "click #inspect-trigger": function(){
    $("#devInspector").slideToggle();
    $(".inspector__data").slideToggle();
    var i = $("#inspect-trigger");
    if(i.html() != "Close"){
      i.attr("data-text", i.html());
      i.html("Close");
    }else {
      i.html(i.attr("data-text"));
    }
  },
  "click #devInspector div": function(){
    $(".inspector__data").html("");
    for(property in this){
      $(".inspector__data").append("<div class=element><span class=property>"+property+"</span>:<span class=value>  "+this[property]+"</span></div>");
    } 
  }
});