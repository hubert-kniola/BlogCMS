namespace GraphQL.Core.Entities
{
    public class Category : BaseEntity
    {
        public string Title { get; set; }
        public string Path { get; set; }
        public RouteObjectType? ObjectType { get; set; } = RouteObjectType.Category;
        public string? ParentId { get; set; }
        public int? DeephLvl{ get; set; }
        public bool? IsConst { get; set; } = false;
    }   

    public enum RouteObjectType
    {
        Category,
        Post,
    }
}
