using GraphQL.Core.Entities;
using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class CategoryMutation
    {
        public async Task<Category> CreateCategoryAsync(Category category, [Service] ICategoryService categoryService) =>
            await categoryService.AddCategory(category);

        public async Task<bool> RemoveCategoryAsync(string id, [Service] ICategoryService categoryService) =>
            await categoryService.RemoveCategoryWithSubCategory(id);
    }
}
