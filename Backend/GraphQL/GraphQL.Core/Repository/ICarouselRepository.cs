using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface ICarouselRepository : IBaseRepository<Carousel>
    {
        Task<IEnumerable<Carousel>> GetActiveCarouselsAsync();
        Task<Carousel?> UpdateAsync(Carousel entity);
    }
}
