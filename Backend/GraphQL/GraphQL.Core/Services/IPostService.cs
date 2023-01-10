using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface IPostService
    {
        public Task<Post> AddAsync(Post post);
        public Task<Post> UpdateAsync(Post post);
        public Task<bool> DeleteAsync(Post post);
    }
}
