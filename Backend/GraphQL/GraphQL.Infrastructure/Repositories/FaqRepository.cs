using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class FaqRepository : BaseRepository<Faq>, IFaqReposiotry
    {
        public FaqRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<Faq?> UpdateAsync(Faq entity)
        {
            if (entity.Id != null)
            {
                Faq? oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Question = Helpers.GetValue(oldEntity.Question, entity.Question);
                    oldEntity.Answer = Helpers.GetValue(oldEntity.Answer, entity.Answer);
                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<Faq>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }

            }
            return null;
        }
    }
}
