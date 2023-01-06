using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class CarouselQuery
    {
        public async Task<IEnumerable<Carousel>> GetCarousels([Service] ICarouselRepository carouselRepository) => await carouselRepository.GetAllAsync();
        public async Task<IEnumerable<Carousel>> GetActiveCarousels([Service] ICarouselRepository carouselRepository) => await carouselRepository.GetActiveCarouselsAsync();

    }
}
