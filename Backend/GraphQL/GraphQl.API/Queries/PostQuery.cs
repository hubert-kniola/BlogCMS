using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class PostQuery
    {
        public async Task<IEnumerable<Post>> GetPostsAsync([Service] IPostRepository postRepository) => await postRepository.GetAllAsync();
        public async Task<Post> GetPostById(string id, [Service] IPostRepository postRepository) => await postRepository.GetByIdAsync(id);
    }
}
