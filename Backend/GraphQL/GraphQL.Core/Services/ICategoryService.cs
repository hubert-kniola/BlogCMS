using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>?> GetAllSubCategories(string categoryId);
        Task<IEnumerable<Category>?> GetAllTags(string categoryId);
        Task<Category> AddCategory(Category category);
        Task<bool> RemoveCategoryWithSubCategory(string id);
    }
}
