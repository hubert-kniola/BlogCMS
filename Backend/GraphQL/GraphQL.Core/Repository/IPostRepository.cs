using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IPostRepository : IBaseRepository<Post>
    {
        Task<IEnumerable<Post>?> GetAllByCategoryId(string categoryId);
        Task<IEnumerable<Post>?> GetAllActivePostAsync();
        Task<IEnumerable<Post>?> GetTopPostAsync();
        Task<Post?> GetFirstPostPremier();
        Task<Post?> UpdateAsync(Post post);
        Task<IEnumerable<Post>>? UpdateTopAsync(IEnumerable<string> top);
    }
}
