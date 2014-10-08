umb2MeteorApiKey =  "1234567891012345678910123456789101234567891012345678910";

Meteor.startup(function () {
	Meteor.methods({
	  publishNode: function (data) {

      if(data._umb2MeteorApiKey == umb2MeteorApiKey) {

        delete data._umb2MeteorApiKey;  

        if(Content.findOne({id: data.id }) == undefined) {
          var newId = Content.insert(data);
          var logText = "Inserted Content: " + data.name + "("+ data.id +") by "+ data.writerName + " :: " + newId; 
          console.log(logText);
          return logText;
        }
        else {
          Content.update({ id: data.id }, {$set: data});
          var logText = "Updated Content: " + data.name + "("+ data.id +") by "+ data.writerName + " :: " + data._id; 
          console.log(logText);
          return logText;
        }
      }
      else {
        console.log("Error: Wrong API Key")
        throw new Meteor.Error(201, "Wrong API Key");
      }

	  },
 
	  deleteNode: function () {

      if(data._umb2MeteorApiKey == umb2MeteorApiKey) {

        delete data._umb2MeteorApiKey;  

        Content.remove({id: data.id })
        var logText = "Deleted Content: " + data.name + "("+ data.id +") by "+ data.writerName; 
        console.log(logText);
        return logText;

      }
      else {
        console.log("Error: Wrong API Key")
        throw new Meteor.Error(201, "Wrong API Key");
      }


	  },


	  publishMedia: function (data) {

      if(data._umb2MeteorApiKey == umb2MeteorApiKey) {

        delete data._umb2MeteorApiKey;  

        if(Media.findOne({id: data.id }) == undefined) {
          var newId = Media.insert(data);
          var logText = "Inserted Media: " + data.name + "("+ data.id +") by "+ data.creatorName + " :: " + newId; 
          console.log(logText);
          return logText;
        }
        else {
          Media.update({ id: data.id }, {$set: data});
          var logText = "Updated Media: " + data.name + "("+ data.id +") by "+ data.creatorName + " :: " + data._id; 
          console.log(logText);
          return logText;
        }
      }
      else {
        console.log("Error: Wrong API Key")
        throw new Meteor.Error(201, "Wrong API Key");
      }

	  },
 
	  deleteMedia: function () {

      if(data._umb2MeteorApiKey == umb2MeteorApiKey) {

        delete data._umb2MeteorApiKey;  

        Media.remove({id: data.id })
        var logText = "Deleted Media: " + data.name + "("+ data.id +") by "+ data.creatorName; 
        console.log(logText);
        return logText;

      }
      else {
        console.log("Error: Wrong API Key")
        throw new Meteor.Error(201, "Wrong API Key");
      }


	  }	  

	});
});