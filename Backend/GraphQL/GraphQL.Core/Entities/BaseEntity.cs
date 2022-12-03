using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GraphQL.Core.Entities
{
    public class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 
        public DateTime? ModifiedOn { get; set; } 
        public DateTime? CreatedOn { get; set; }

    }
}
