using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Resolver
{
    [ExtendObjectType(name:nameof(Category))]
    [Authorize]
    public class CategoryResolver
    {
        public Task<Category> GetCategoryAsync([Parent] Post post,[Service] ICategoryRepository categoryRepository ) 
            => categoryRepository.GetByIdAsync( post.CategoryId );
    }
}
