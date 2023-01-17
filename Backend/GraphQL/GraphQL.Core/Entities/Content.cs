namespace GraphQL.Core.Entities
{
    public class Content : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public ContentType? Type { get; set; }
    }

    public enum ContentType
    {
        Footer,
        LastPost
    }
}
