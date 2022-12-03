using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class CategoryQuery
    {
        #region CATEGORY
        public Task<IEnumerable<Category>> GetCategory([Service] ICategoryRepository categoryRepository) => categoryRepository.GetAllAsync();
        public Task<Category> GetCategoryById(string id, [Service] ICategoryRepository categoryRepository) => categoryRepository.GetByIdAsync(id);
        #endregion

    }
}
