using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name:"Mutation")]
    [Authorize]
    public class PostMutation
    {
        public async Task<Post> CreatePostAsync(Post post, [Service] IPostRepository productRepository) =>
            await productRepository.InsertAsync(post);

        public async Task<bool> RemovePosttAsync(string id, [Service] IPostRepository productRepository) =>
            await productRepository.RemoveAsync(id);
    }
}
