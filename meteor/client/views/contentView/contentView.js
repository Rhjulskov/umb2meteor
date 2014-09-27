
Template.contentView.helpers({
  content: function() {
    return Content.find();
  }
});

Template.contentView.templateIs = function(template) {
	return this.Template === template;
}


