using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class PostMutation
    {
        public async Task<Post> CreatePostAsync(Post post, [Service] IPostRepository postRepository) =>
            await postRepository.InsertAsync(post);

        public async Task<Post?> UpdatePostAsync(Post post, [Service] IPostRepository postRepository)
            => await postRepository.UpdateAsync(post);

        public async Task<bool> RemovePosttAsync(string id, [Service] IPostRepository postRepository) =>
            await postRepository.RemoveAsync(id);
    }
}
