using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class PostQuery
    {
        public Task<IEnumerable<Post>> GetPostsAsync([Service] IPostRepository postRepository) => postRepository.GetAllAsync();
        public Task<Post> GetPostById(string id, [Service] IPostRepository postRepository) => postRepository.GetByIdAsync(id);
    }
}
