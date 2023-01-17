using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IContentRepository : IBaseRepository<Content>
    {
        Task<IEnumerable<Content>> GetContentByTypeAsync(ContentType type);

        Task<Content?> UpdateAsync(Content entity);
    }
}
