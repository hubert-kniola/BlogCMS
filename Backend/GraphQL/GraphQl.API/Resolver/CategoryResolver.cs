using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Resolver
{
    [ExtendObjectType(name: nameof(Category))]
    [Authorize]
    public class CategoryResolver
    {
        [UseFiltering]
        public async Task<IEnumerable<Category>> GetCategoriesAsync([Parent] Post post, [Service] ICategoryRepository categoryRepository)
            => await categoryRepository.GetManyByIdsAsync(post.Categories);

        [UseFiltering]
        public async Task<IEnumerable<Category>> GetSubCategoryAsync([Parent] Category category, [Service] ICategoryRepository categoryRepository)
            => await categoryRepository.GetCategoriesByParentId(category.Id);
    }
}
