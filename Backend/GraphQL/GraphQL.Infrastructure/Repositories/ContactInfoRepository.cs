using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public  class ContactInfoRepository : BaseRepository<ContactInfo>, IContactInfoRepository
    {
        public ContactInfoRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<ContactInfo?> UpdateAsync(ContactInfo entity)
        {
            if (entity.Id != null)
            {
                ContactInfo oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Title = Helpers.GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Content = Helpers.GetValue(oldEntity.Content, entity.Content);
                    oldEntity.TextBoxes = Helpers.GetValue(oldEntity.TextBoxes, entity.TextBoxes);
                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<ContactInfo>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }

            return null;
        }
    }
}
