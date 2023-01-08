using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface ICategoryService
    {
        Task<Category> AddCategory(Category category);
        Task<bool> RemoveCategoryWithSubCategory(string id);
    }
}
