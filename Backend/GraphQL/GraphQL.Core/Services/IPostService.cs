using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface IPostService
    {
        public Task<Post?> InsertAsync(Post post);
        public Task<Post?> UpdateAsync(Post post);
        Task<bool> UpdateDeletedCategory(string categoryId, string? parentCategoryId = null);
    }
}
