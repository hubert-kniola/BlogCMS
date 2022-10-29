using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IPostRepository : IBaseRepository<Post>
    {
        Task<IEnumerable<Post>> GetAllByCategoryId(string categoryId);
    }
}
