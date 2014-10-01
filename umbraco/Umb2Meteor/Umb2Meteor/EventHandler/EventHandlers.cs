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

namespace Umb2Meteor.EventHandler {
    public class EventHandlers : ApplicationEventHandler {
        private string apiUrl;
        private string apiKey;

        public EventHandlers()
        {
            apiUrl = readSetting("umb2MeteorApiUrl");
            apiKey = readSetting("umb2MeteorApiKey");

            ContentService.Published += Go;
        }

        private void Go(IPublishingStrategy sender, PublishEventArgs<IContent> args)
        {
            foreach (var node in args.PublishedEntities)
            {
                appendLine(node.Id + " : " + node.Name);
                SendNode(node);

            }
        }

        private void SendNode(IContent node) {
            // Create a request using a URL that can receive a post. 

            JsonRequest.Request request = new JsonRequest.Request();

            string response = request.Execute(apiUrl, node, "POST").ToString();

            appendLine(response);
            /*
            WebRequest request = WebRequest.Create("http://umb2meteor.meteor.com/api/umb2Meteor");
            

            // Set the Method property of the request to POST.
            request.Method = "POST";
            // Create POST data and convert it to a byte array.
            string postData = "This is a test that posts this string to a Web server.";
            byte[] byteArray = Encoding.UTF8.GetBytes (postData);
            // Set the ContentType property of the WebRequest.
            request.ContentType = "text/json";
            // Set the ContentLength property of the WebRequest.
            request.ContentLength = byteArray.Length;
            // Get the request stream.
            Stream dataStream = request.GetRequestStream ();
            // Write the data to the request stream.
            dataStream.Write (byteArray, 0, byteArray.Length);
            // Close the Stream object.
            dataStream.Close ();
            // Get the response.
            WebResponse response = request.GetResponse ();
            // Display the status.
            Console.WriteLine (((HttpWebResponse)response).StatusDescription);
            // Get the stream containing content returned by the server.
            dataStream = response.GetResponseStream ();
            // Open the stream using a StreamReader for easy access.
            StreamReader reader = new StreamReader (dataStream);
            // Read the content.
            string responseFromServer = reader.ReadToEnd ();
            // Display the content.
            appendLine(responseFromServer);
            // Clean up the streams.
            reader.Close ();
            dataStream.Close ();
            response.Close ();
             */
        }

        private void appendLine(string line) {
            using (StreamWriter sw = System.IO.File.AppendText(HttpContext.Current.Server.MapPath("/test.txt"))) {
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