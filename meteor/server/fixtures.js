


if(Meteor.isClient) {

  if (Content.find().count() === 0 && location.host.indexOf("localhost") > -1) { // Smid et && false på når den skal på live :) 

    Content.insert({"id":1056,"name":"designmonkey.dk","level":1,"parent":-1,"sortOrder":1,"nodeTypeAlias":"Frontpage","createDate":1408088108310,"updateDate":1412633825422,"path":"-1,1056","url":"http://v2.designmonkey.dk/","niceUrl":"/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"designmonkeydk","template":"Master"}); 
    Content.insert({"body":"<p><strong>WHAT UP?? :)&nbsp;</strong></p>\n<p>Nu med gem&nbsp;</p>\n<p>We are posting... live... from Umbraco :D&nbsp;</p>","createDate":1408088155160,"creatorName":"Peter Nielsen","head":"Om mig","id":1057,"level":2,"name":"About","niceUrl":"/about/","nodeTypeAlias":"RegularText","parent":1056,"path":"-1,1056,1057","sortOrder":2,"template":"Master","updateDate":1412633825630,"url":"http://v2.designmonkey.dk/about/","urlName":"about","writeName":"Peter Nielsen"}); 
    Content.insert({"id":1062,"name":"Contact","level":2,"parent":1056,"sortOrder":2,"nodeTypeAlias":"RegularText","createDate":1408088244110,"updateDate":1412633825611,"path":"-1,1056,1062","url":"http://v2.designmonkey.dk/contact/","niceUrl":"/contact/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"contact","template":"Master","head":"Contact","body":""}); 
    Content.insert({"id":1061,"name":"Monkey Lab","level":2,"parent":1056,"sortOrder":2,"nodeTypeAlias":"Gallery","createDate":1408088227183,"updateDate":1412633825594,"path":"-1,1056,1061","url":"http://v2.designmonkey.dk/monkey-lab/","niceUrl":"/monkey-lab/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"monkey-lab","template":"Master","head":"Monkey lab"}); 
    Content.insert({"id":1058,"name":"Work","level":2,"parent":1056,"sortOrder":2,"nodeTypeAlias":"Gallery","createDate":1408088165253,"updateDate":1412633825575,"path":"-1,1056,1058","url":"http://v2.designmonkey.dk/work/","niceUrl":"/work/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"work","template":"Master","head":"This is my work"}); 
    Content.insert({"id":1059,"name":"5 seconds weekly","level":2,"parent":1056,"sortOrder":2,"nodeTypeAlias":"Gallery","createDate":1408088190883,"updateDate":1412633825556,"path":"-1,1056,1059","url":"http://v2.designmonkey.dk/5-seconds-weekly/","niceUrl":"/5-seconds-weekly/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"5-seconds-weekly","template":"Master","head":"5 Seconds Weekly"}); 
    Content.insert({"id":1060,"name":"Skills","level":2,"parent":1056,"sortOrder":2,"nodeTypeAlias":"RegularText","createDate":1408088210507,"updateDate":1412633825531,"path":"-1,1056,1060","url":"http://v2.designmonkey.dk/skills/","niceUrl":"/skills/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"skills","template":"Master","head":"What I do","body":"<p>Tester</p>"}); 
    Content.insert({"id":1061,"name":"Skills Description","level":3,"parent":1060,"sortOrder":1,"nodeTypeAlias":"RegularText","createDate":1408088210507,"updateDate":1412633825531,"path":"-1,1056,1060","url":"http://v2.designmonkey.dk/skills/","niceUrl":"/skills/skillstest/","creatorName":"Peter Nielsen","writeName":"Peter Nielsen","urlName":"skillstest","template":"Master","head":"What I do","body":"<p>skillstest</p>"}); 
    
  }

}
