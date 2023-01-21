using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface IPostService
    {
        Task<IEnumerable<Post>?> GetSimilarPostAsync(string postId);
        Task<IEnumerable<Post>?> GetPostByPathAsync(string path);
        Task<Post?> InsertAsync(Post post);
        Task<Post?> UpdateAsync(Post post);
        Task<bool> UpdateDeletedCategory(string categoryId, string? parentCategoryId = null);
    }
}
