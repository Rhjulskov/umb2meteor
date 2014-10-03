using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Umb2Meteor.Models {
    public class ContentModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NodeTypeAlias { get; set; }
        public string Path { get; set; }
        public int Parent { get; set; }
        public string UrlName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Url { get; set; }
        public int Level { get; set; }
        public string Template { get; set; }
        public int SortOrder { get; set; }
        public List<PropertyModel> Properties;
        public string NiceUrl { get; set; }
        public string CreatorName { get; set; }
        public string WriteName { get; set; }

        public ContentModel() {
            Properties = new List<PropertyModel>();
        }
    }

    public class PropertyModel {
        public string Alias { get; set; }
        public object Value { get; set; }
    }
}