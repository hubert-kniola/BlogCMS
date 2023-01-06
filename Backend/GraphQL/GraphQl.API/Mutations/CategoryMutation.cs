using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class CategoryMutation
    {
        public async Task<Category> CreateCategoryAsync(Category category, [Service] ICategoryRepository categoryRepository) =>
            await categoryRepository.InsertAsync(category);

        public async Task<bool> RemoveCategoryAsync(string id, [Service] ICategoryRepository categoryRepository) => 
            await categoryRepository.RemoveAsync(id);
    }
}
