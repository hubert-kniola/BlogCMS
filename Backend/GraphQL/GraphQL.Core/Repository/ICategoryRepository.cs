using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        Task<IEnumerable<Category>> GetCategoriesByParentId(string parentId);
        Task<IEnumerable<Category>> GetAllTags();
        Task<bool> IsExists(Category category);
        Task<string?> GetMainPostCategoryId();
    }
}
