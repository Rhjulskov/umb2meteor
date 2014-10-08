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

            if (apiUrl.Substring(apiUrl.Length - 1) != "/") {
                apiUrl += "/";
            }

            ContentService.Published += ContentService_Published;
            ContentService.UnPublished += ContentService_UnPublished;
            ContentService.Deleted += ContentService_Deleted;
            ContentService.Trashed += ContentService_Trashed;

            MediaService.Saved += MediaService_Saved;
            MediaService.Deleted += MediaService_Deleted;
            MediaService.Trashed += MediaService_Trashed;

        }

        void ContentService_Trashed(IContentService sender, MoveEventArgs<IContent> e) {
                IContent node = e.Entity;
                dynamic content = new ExpandoObject();
                content._umb2MeteorApiKey = apiKey;
                content.id = node.Id;
                content.uniqueId = node.Key.ToString();
                content.name = node.Name;
                deleteNode(content);
        }

        private void ContentService_Deleted(IContentService sender, DeleteEventArgs<IContent> e) {
            foreach (var node in e.DeletedEntities) {
                dynamic content = new ExpandoObject();
                content._umb2MeteorApiKey = apiKey;
                content.id = node.Id;
                content.uniqueId = node.Key.ToString();
                content.name = node.Name;
                deleteNode(content);
            }
        }

        private void ContentService_UnPublished(IPublishingStrategy sender, PublishEventArgs<IContent> e) {
            foreach (var node in e.PublishedEntities) {
                dynamic content = new ExpandoObject();
                content._umb2MeteorApiKey = apiKey;
                content.id = node.Id;
                content.uniqueId = node.Key.ToString();
                content.name = node.Name;

                deleteNode(content);
            }
        }


        private void ContentService_Published(IPublishingStrategy sender, PublishEventArgs<IContent> e) {
            foreach (var node in e.PublishedEntities) {
                Node thisNode = new Node(node.Id);
                dynamic content = new ExpandoObject();
                content._umb2MeteorApiKey = apiKey;
                content.id = node.Id;
                content.uniqueId = node.Key.ToString();
                content.name = node.Name;
                content.level = node.Level;
                content.parent = node.ParentId;
                content.sortOrder = node.SortOrder;
                content.nodeTypeAlias = node.ContentType.Alias;
                content.createDate = toUnixTime(node.CreateDate);
                content.updateDate = toUnixTime(node.UpdateDate);
                content.path = node.Path;
                content.url = thisNode.Url;
                content.niceUrl = (thisNode.NiceUrl.IndexOf("http") == 0) ? new Uri(thisNode.NiceUrl).AbsolutePath : thisNode.NiceUrl;
                content.creatorName = thisNode.CreatorName;
                content.writerName = thisNode.WriterName;
                content.urlName = thisNode.UrlName;
                content.template = node.Template.Alias;

                foreach (var prop in node.Properties) {
                    try {
                        ((IDictionary<string, object>)content)[prop.Alias] = (prop.Value.GetType() == typeof(DateTime)) ? toUnixTime((DateTime)prop.Value) : prop.Value;
                    }
                    catch (Exception ex) {
                        ((IDictionary<string, object>)content)[prop.Alias] = ex.Message;
                    }
                }

                publishNode(content);

            }
        }

        private void MediaService_Deleted(IMediaService sender, DeleteEventArgs<IMedia> e) {
            foreach (IMedia thisMedia in e.DeletedEntities) {
                dynamic media = new ExpandoObject();
                media._umb2MeteorApiKey = apiKey;
                media.id = thisMedia.Id;
                media.uniqueId = thisMedia.Key.ToString();
                media.name = thisMedia.Name;
                deleteMedia(media);
            }
        }

        void MediaService_Trashed(IMediaService sender, MoveEventArgs<IMedia> e) {
            dynamic media = new ExpandoObject();
            IMedia thisMedia = e.Entity;
            media._umb2MeteorApiKey = apiKey;
            media.id = thisMedia.Id;
            media.uniqueId = thisMedia.Key.ToString();
            media.name = thisMedia.Name;
            deleteMedia(media);
        }

        private void MediaService_Created(IMediaService sender, NewEventArgs<IMedia> e) {
            IMedia thisMedia = e.Entity;
            dynamic media = new ExpandoObject();
            media._umb2MeteorApiKey = apiKey;
            media.id = thisMedia.Id;
            media.uniqueId = thisMedia.Key.ToString();
            media.name = thisMedia.Name;
            media.level = thisMedia.Level;
            media.parent = thisMedia.ParentId;
            media.sortOrder = thisMedia.SortOrder;
            media.nodeTypeAlias = thisMedia.ContentType.Alias;
            media.createDate = toUnixTime(thisMedia.CreateDate);
            media.updateDate = toUnixTime(thisMedia.UpdateDate);
            media.path = thisMedia.Path;
            string url = HttpContext.Current.Request.Url.Host.ToLower();
            url = (url.IndexOf("http") != 0) ? HttpContext.Current.Request.Url.Scheme + "://" + url : url;
            url = (url.Substring(url.Length - 1) == "/") ? url.Substring(0, url.Length - 1) : url;

            foreach (var prop in thisMedia.Properties) {
                try {
                    ((IDictionary<string, object>)media)[prop.Alias] = (prop.Value.GetType() == typeof(DateTime)) ? toUnixTime((DateTime)prop.Value) : prop.Value;
                    if (prop.Alias == "umbracoFile") {
                        url += prop.Value.ToString();
                        media.url = url;
                    }
                }
                catch (Exception ex) {
                    ((IDictionary<string, object>)media)[prop.Alias] = ex.Message;
                }
            }

            publishMedia(media);

        }

        private void MediaService_Saved(IMediaService sender, SaveEventArgs<IMedia> e) {
            foreach (IMedia thisMedia in e.SavedEntities) {
                dynamic media = new ExpandoObject();
                media._umb2MeteorApiKey = apiKey;
                media.id = thisMedia.Id;
                media.uniqueId = thisMedia.Key.ToString();
                media.name = thisMedia.Name;
                media.level = thisMedia.Level;
                media.parent = thisMedia.ParentId;
                media.sortOrder = thisMedia.SortOrder;
                media.nodeTypeAlias = thisMedia.ContentType.Alias;
                media.createDate = toUnixTime(thisMedia.CreateDate);
                media.updateDate = toUnixTime(thisMedia.UpdateDate);
                media.path = thisMedia.Path;

                string url = HttpContext.Current.Request.Url.Host.ToLower();
                url = (url.IndexOf("http") != 0) ? HttpContext.Current.Request.Url.Scheme +"://"+ url : url;
                url = (url.Substring(url.Length-1) == "/") ? url.Substring(0, url.Length-1) : url;

                foreach (var prop in thisMedia.Properties) {
                    try {
                        ((IDictionary<string, object>)media)[prop.Alias] = (prop.Value.GetType() == typeof(DateTime)) ? toUnixTime((DateTime)prop.Value) : prop.Value;
                        if (prop.Alias == "umbracoFile") {
                            url += prop.Value.ToString();
                            media.url = url;
                        }
                    }
                    catch (Exception ex) {
                        ((IDictionary<string, object>)media)[prop.Alias] = ex.Message;
                    }
                }

                publishMedia(media);
            }
        }


        private long toUnixTime(DateTime dateTime) {
            return (dateTime - UnixEpoch).Ticks / TimeSpan.TicksPerMillisecond;
        }

        private void publishNode(object content) {
            // Create a request using a URL that can receive a post. 
            JsonRequest.Request request = new JsonRequest.Request();
            string response = request.Execute(apiUrl + "publishNode", content, "POST").ToString();
            appendLine("publishNode() :: " + response);
        }

        private void deleteNode(object content) {
            // Create a request using a URL that can receive a post. 
            JsonRequest.Request request = new JsonRequest.Request();
            string response = request.Execute(apiUrl + "deleteNode", content, "POST").ToString();
            appendLine("deleteNode() :: " + response);
        }

        private void publishMedia(object media) {
            // Create a request using a URL that can receive a post. 
            JsonRequest.Request request = new JsonRequest.Request();
            string response = request.Execute(apiUrl + "publishMedia", media, "POST").ToString();
            appendLine("publishMedia() :: " + response);
        }

        private void deleteMedia(object media) {
            // Create a request using a URL that can receive a post. 
            JsonRequest.Request request = new JsonRequest.Request();
            string response = request.Execute(apiUrl + "deleteMedia", media, "POST").ToString();
            appendLine("deleteMedia() :: " + response);
        }

        private void appendLine(string line) {
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