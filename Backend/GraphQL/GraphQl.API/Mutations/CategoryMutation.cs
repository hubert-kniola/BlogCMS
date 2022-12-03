using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class CategoryMutation
    {
        public Task<Category> CreateCategoryAsync(Category category, [Service] ICategoryRepository categoryRepository) =>
            categoryRepository.InsertAsync(category);

        public Task<bool> RemoveCategoryAsync(string id, [Service] ICategoryRepository categoryRepository) =>
            categoryRepository.RemoveAsync(id);
    }
}
