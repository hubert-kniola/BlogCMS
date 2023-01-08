namespace GraphQL.Core.Entities
{
    public class MenuItem : BaseEntity
    {
        public string Title { get; set; }
        public string Path { get; set; }
        public RouteObjectType? ObjectType { get; set; } = RouteObjectType.Category;
        public IEnumerable<MenuItem?>? SubMenu { get; set; } = null;
    }

}
