using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<IEnumerable<Post>> GetAllByCategoryId(string categoryId)
        {
            var filter = Builders<Post>.Filter.Eq(_ => _.CategoryId, categoryId);

            return await _collection.Find(filter).ToListAsync();
        }

    }
}
