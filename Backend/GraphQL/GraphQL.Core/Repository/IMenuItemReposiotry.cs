using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IMenuItemReposiotry : IBaseRepository<MenuItem>
    {
        Task<MenuItem?> UpdateAsync(MenuItem entity);
    }
}
