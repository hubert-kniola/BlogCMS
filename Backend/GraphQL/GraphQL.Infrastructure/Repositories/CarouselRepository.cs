using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class CarouselRepository : BaseRepository<Carousel>, ICarouselRepository
    {
        public CarouselRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<IEnumerable<Carousel>> GetActiveCarouselsAsync()
        {
            return (await _collection.FindAsync(x => x.Active == true)).ToEnumerable();
        }

        public async Task<Carousel?> UpdateAsync(Carousel entity)
        {
            if (entity.Id != null)
            {
                Carousel oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Title = Helpers.GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Content = Helpers.GetValue(oldEntity.Content, entity.Content);
                    oldEntity.PublicationDate = Helpers.GetValue(oldEntity.PublicationDate, entity.PublicationDate);
                    oldEntity.ImgName = Helpers.GetValue(oldEntity.ImgName, entity.ImgName);
                    oldEntity.Active = Helpers.GetValue(oldEntity.Active, entity.Active);
                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<Carousel>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }

            return null;
        }

    }
}
