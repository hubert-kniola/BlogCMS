using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(string id);
        Task<T> InsertAsync(T entity);
        Task<IEnumerable<T>> InsertManyAsync(IEnumerable<T> entities);
        Task<bool> RemoveAsync(string id);
        Task<bool> RemoveAllAsync();
    }
}
