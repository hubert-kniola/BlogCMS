using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class PostQuery
    {
        public async Task<IEnumerable<Post>> GetPostsAsync([Service] IPostRepository postRepository)
            => await postRepository.GetAllAsync();
        
        public async Task<Post?> GetPostById(string id, [Service] IPostRepository postRepository)
            => await postRepository.GetByIdAsync(id);

        public async Task<IEnumerable<Post>?> GetTopThreePostAsync([Service] IPostRepository postRepository)
            => await postRepository.GetTopPostAsync();

        public async Task<IEnumerable<Post>?> GetPostByCategoryIdAsync(string categoryId, [Service] IPostService postService)
            => await postService.GetPostByCategoryIdAsync(categoryId);

        public async Task<IEnumerable<Post>?> GetSimilarPostAsync(string postId, [Service] IPostService postService)
            => await postService.GetSimilarPostAsync(postId);

    }
}
