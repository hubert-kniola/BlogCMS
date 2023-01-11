using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class PostMutation
    {
        public async Task<Post?> CreatePostAsync(Post post, [Service] IPostService postService) 
            => await postService.InsertAsync(post);

        public async Task<Post?> UpdatePostAsync(Post post, [Service] IPostService postService)
            => await postService.UpdateAsync(post);

        public async Task<bool> RemovePostAsync(string id, [Service] IPostRepository postRepository) 
            => await postRepository.RemoveAsync(id);
    }
}
