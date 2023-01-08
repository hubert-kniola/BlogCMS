using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class CarouselMutation
    {
        public async Task<Carousel> AddCarouselElementAsync(Carousel carousel, [Service] ICarouselRepository carouselRepository) =>
            await carouselRepository.InsertAsync(carousel);

        public async Task<IEnumerable<Carousel>> AddManyCarouselElementsAsync(IEnumerable<Carousel> carousels, [Service] ICarouselRepository carouselRepository) =>
            await carouselRepository.InsertManyAsync(carousels);

        public async Task<Carousel?> UpdateCarouselAsync(Carousel carousel, [Service] ICarouselRepository carouselRepository) =>
            await carouselRepository.UpdateAsync(carousel);

        public async Task<bool> RemoveCaruselAsync(string id, [Service] ICarouselRepository carouselRepository) =>
            await carouselRepository.RemoveAsync(id);

        public async Task<bool> RemoveAllCaruselsAsync( [Service] ICarouselRepository carouselRepository) =>
             await carouselRepository.RemoveAllAsync();
    }
}
