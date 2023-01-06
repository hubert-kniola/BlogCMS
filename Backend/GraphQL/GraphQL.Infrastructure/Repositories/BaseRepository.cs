using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly IMongoCollection<T> _collection;
        public BaseRepository(ICatalogContext catalogContext)
        {
            if (catalogContext == null)
                throw new ArgumentNullException(nameof(catalogContext));

            _collection = catalogContext.GetCollection<T>(typeof(T).Name);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<T> GetByIdAsync(string id)
        {
            var filter = Builders<T>.Filter.Eq(_ => _.Id, id);

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<T> InsertAsync(T entity)
        {
            entity.CreatedOn = DateTime.Now;
            entity.ModifiedOn = DateTime.Now;

            await _collection.InsertOneAsync(entity);

            return entity;
        }

        public async Task<IEnumerable<T>> InsertManyAsync(IEnumerable<T> entities)
        {
            foreach(var entity in entities)
            {
                entity.CreatedOn = DateTime.Now;
                entity.ModifiedOn = DateTime.Now;
            }

            await _collection.InsertManyAsync(entities);

            return entities;
        }

        public async Task<bool> RemoveAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(Builders<T>.Filter.Eq(_ => _.Id, id));

            return result.DeletedCount > 0;
        }

        public async Task<bool> RemoveAllAsync()
        {
            var count = (await GetAllAsync()).Count();
            var result = await _collection.DeleteManyAsync(x => true);

            return count == result.DeletedCount;
        }
    }
}
