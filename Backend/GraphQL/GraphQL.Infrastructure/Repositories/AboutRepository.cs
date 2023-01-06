using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;
using SharpCompress.Common;
using System.Security.Principal;

namespace GraphQL.Infrastructure.Repositories
{
    public class AboutRepository : BaseRepository<About>, IAboutRepository
    {
        public AboutRepository(ICatalogContext catalogContext) : base(catalogContext)
        {

        }

        public async Task<About?> UpdateAsync(About entity)
        {
            if(entity.Id!= null)
            {
                About oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null) {
                    oldEntity.Title = GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Text = GetValue(oldEntity.Text, entity.Text);
                    oldEntity.Img = GetValue(oldEntity.Img, entity.Img);
                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<About>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }

            return null;
        }

        private static T GetValue<T>(T oldValue, T newValue)
        {
            return newValue != null ? newValue : oldValue;
        }
    }
}
