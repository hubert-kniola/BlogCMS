using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Resolver
{
    [ExtendObjectType(name: nameof(Post))]
    [Authorize]
    public class PostResolver
    {
        public Task<IEnumerable<Post>> GetAllPosts([Parent] Category category, [Service] IPostRepository postRepository)
            => postRepository.GetAllByCategoryId(category.Id);
    }
}
