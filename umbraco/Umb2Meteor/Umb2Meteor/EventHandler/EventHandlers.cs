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
using Umb2Meteor.Models;
using umbraco.NodeFactory;
using umbraco;

namespace Umb2Meteor.EventHandler {
    public class EventHandlers : ApplicationEventHandler {
        private string apiUrl;
        private string apiKey;

        public EventHandlers()
        {
            apiUrl = readSetting("umb2MeteorApiUrl");
            apiKey = readSetting("umb2MeteorApiKey");

            ContentService.Published += publishToMeteor;
        }

        private void publishToMeteor(IPublishingStrategy sender, PublishEventArgs<IContent> args)
        {
            foreach (var node in args.PublishedEntities)
            {
                Node thisNode = new Node(node.Id);
                ContentModel content = new ContentModel();
                content.Id = node.Id;
                content.Name = node.Name;
                content.Level = node.Level;
                content.Parent = node.ParentId;
                content.SortOrder = node.Level;
                content.NodeTypeAlias = node.ContentType.Alias;//node.Level;
                content.CreateDate = node.CreateDate;
                content.UpdateDate = node.UpdateDate;
                content.Path = node.Path;
                content.Url = thisNode.Url;
                content.NiceUrl = thisNode.NiceUrl;
                content.CreatorName = thisNode.CreatorName;
                content.WriteName = thisNode.WriterName;
                content.UrlName = thisNode.UrlName;
                content.Template = node.Template.Alias;
                foreach (var prop in node.Properties) {
                    PropertyModel property = new PropertyModel();
                    property.Alias = prop.Alias;
                    property.Value = prop.Value;
                    content.Properties.Add(property);
                }
                SendNode(content);

            }
        }

        private void SendNode(ContentModel content) {
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