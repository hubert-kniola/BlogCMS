using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>?> GetAllSubCategories(string categoryId);
        Task<IEnumerable<Category>?> GetTags(string categoryId);
        Task<CategoryTree?> GetCategoryTree(Post post);
        Task<Category?> AddCategory(Category category);
        Task<bool> RemoveCategoryWithSubCategory(string id);

    }
}
