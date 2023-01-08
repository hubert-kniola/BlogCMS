using GraphQL.API.Queries;
using GraphQL.API.Types;
using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Resolver
{
    [ExtendObjectType(name:nameof(Category))]
    [Authorize]
    public class CategoryResolver
    {
        public async Task<Category> GetCategoryAsync([Parent] Post post,[Service] ICategoryRepository categoryRepository ) 
            => await categoryRepository.GetByIdAsync( post.CategoryId );

        [UseFiltering]
        public async Task<IEnumerable<Category>> GetSubCategoryAsync([Parent] Category category, [Service] ICategoryRepository categoryRepository)
            => await categoryRepository.GetCategoriesByParentId(category.Id);
    }
}
