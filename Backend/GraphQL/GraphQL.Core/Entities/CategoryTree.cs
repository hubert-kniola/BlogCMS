namespace GraphQL.Core.Entities
{
    public class CategoryTree : BaseEntity
    {
        public Category? MainCategory { get; set; }
        public Category? SubCategory { get; set; }
        public IEnumerable<Category> Tags { get; set; }
    }
}
