using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;
using SharpCompress.Common;

namespace GraphQL.Infrastructure.Repositories
{
    public class ContentRepository : BaseRepository<Content>, IContentRepository
    {
        public ContentRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<IEnumerable<Content>> GetContentByTypeAsync(ContentType type)
        {
            return await _collection.Find(x => x.Type == type).ToListAsync();
        }

        public async Task<Content?> UpdateAsync(Content entity)
        {
            if (entity.Id != null)
            {
                Content oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Name = Helpers.GetValue(oldEntity.Name, entity.Name);
                    oldEntity.Value = Helpers.GetValue(oldEntity.Value, entity.Value);
                    oldEntity.ModifiedOn = DateTime.Now;

                    await _collection.ReplaceOneAsync(x => x.Id.Equals(entity.Id), oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }

            return null;
        }
    }
}
