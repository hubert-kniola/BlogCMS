using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IAboutRepository : IBaseRepository<About>
    {
        Task<About?> UpdateAsync(About entity);

    }
}
