using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;
using SharpCompress.Common;

namespace GraphQL.Infrastructure.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<IEnumerable<Post>> GetAllByCategoryId(string categoryId)
        {
            var filter = Builders<Post>.Filter.Eq(_ => _.Categories.First().Id, categoryId);

            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<Post?> UpdateAsync(Post entity)
        {
            if (entity.Id != null)
            {
                Post oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Title = Helpers.GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Content = Helpers.GetValue(oldEntity.Content, entity.Content);
                    oldEntity.Snippet = Helpers.GetValue(oldEntity.Snippet, entity.Snippet);
                    oldEntity.TimeToReadInMs = Helpers.GetValue(oldEntity.TimeToReadInMs, entity.TimeToReadInMs);
                    oldEntity.PrimaryImgName = Helpers.GetValue(oldEntity.PrimaryImgName, entity.PrimaryImgName);
                    oldEntity.ContentImgName = entity.ContentImgName;
                    oldEntity.PublicationDate = entity.PublicationDate;
                    oldEntity.Categories = entity.Categories;

                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<Post>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }
            return null;

        }
    }
}
