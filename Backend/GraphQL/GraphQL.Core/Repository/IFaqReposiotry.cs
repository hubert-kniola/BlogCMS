using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IFaqReposiotry : IBaseRepository<Faq>
    {
        Task<Faq?> UpdateAsync(Faq entity);
    }
}
