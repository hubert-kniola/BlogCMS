using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GraphQL.Core.Entities
{
    public class Post : BaseEntity
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public string CategoryId { get; set; }
    }
}
 