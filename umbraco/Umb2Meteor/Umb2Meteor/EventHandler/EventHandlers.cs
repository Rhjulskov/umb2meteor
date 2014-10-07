using Umbraco.Core;
using Umbraco.Core.Events;
using Umbraco.Core.Models;
using Umbraco.Core.Publishing;
using Umbraco.Core.Services;

using System;
using System.IO;
using System.Web;
using System.Net;
using System.Text;
using System.Configuration;
using umbraco.NodeFactory;
using umbraco;
using System.Dynamic;
using System.Collections.Generic;

namespace Umb2Meteor.EventHandler {
    public class EventHandlers : ApplicationEventHandler {
        private string apiUrl;
        private string apiKey;
        private DateTime UnixEpoch = new DateTime(1970, 1, 1);

        public EventHandlers()
        {
            apiUrl = readSetting("umb2MeteorApiUrl");
            apiKey = readSetting("umb2MeteorApiKey");

            ContentService.Published += ContentService_Published;
            ContentService.UnPublished += ContentService_UnPublished;
            ContentService.Deleted += ContentService_Deleted;

            MediaService.Saved += MediaService_Saved;
            MediaService.Deleted += MediaService_Deleted;
        }

        void MediaService_Deleted(IMediaService sender, DeleteEventArgs<IMedia> e) {
            throw new NotImplementedException();
        }

        void MediaService_Created(IMediaService sender, NewEventArgs<IMedia> e) {
            throw new NotImplementedException();
        }

        void ContentService_Deleted(IContentService sender, DeleteEventArgs<IContent> e) {
            throw new NotImplementedException();
        }

        void ContentService_UnPublished(IPublishingStrategy sender, PublishEventArgs<IContent> e) {
            throw new NotImplementedException();
        }


        void MediaService_Saved(IMediaService sender, SaveEventArgs<IMedia> e) {
            throw new NotImplementedException();
        }




        private void ContentService_Published(IPublishingStrategy sender, PublishEventArgs<IContent> e)
        {
            foreach (var node in e.PublishedEntities)
            {
                Node thisNode = new Node(node.Id);
                dynamic content = new ExpandoObject();
                content._umb2MeteorApiKey = apiKey;
                content.id = node.Id;
                content.name = node.Name;
                content.level = node.Level;
                content.parent = node.ParentId;
                content.sortOrder = node.SortOrder;
                content.nodeTypeAlias = node.ContentType.Alias;
                content.createDate = toUnixTime(node.CreateDate);
                content.updateDate = toUnixTime(node.UpdateDate);
                content.path = node.Path;
                content.url = thisNode.Url;
                content.niceUrl = new Uri(thisNode.NiceUrl).AbsolutePath;
                content.creatorName = thisNode.CreatorName;
                content.writeName = thisNode.WriterName;
                content.urlName = thisNode.UrlName;
                content.template = node.Template.Alias;

                foreach (var prop in node.Properties) {
                    ((IDictionary<string, object>)content)[prop.Alias] = (prop.Value.GetType() ==  typeof(DateTime)) ? toUnixTime((DateTime)prop.Value) : prop.Value;
                }

                SendNode(content);

            }
        }


        private long toUnixTime(DateTime dateTime) {
            return (dateTime - UnixEpoch).Ticks / TimeSpan.TicksPerMillisecond;
        }

        private void SendNode(object content) {
            // Create a request using a URL that can receive a post. 
            JsonRequest.Request request = new JsonRequest.Request();
            string response = request.Execute(apiUrl, content, "POST").ToString();
            
            appendLine(response);
        }

        public void appendLine(string line) {
            string logPath = HttpContext.Current.Server.MapPath("/umb2metorlog.txt");
            if (!System.IO.File.Exists(logPath)) {
                System.IO.File.Create(logPath);
            }
            using (StreamWriter sw = System.IO.File.AppendText(logPath)) {
                sw.WriteLine(DateTime.Now + " - " + line);
            }
        }

        private string readSetting(string key) {
            var appSettings = ConfigurationManager.AppSettings;
            string result = appSettings[key] ?? "Not Found";
            return result;
        }

    }
}