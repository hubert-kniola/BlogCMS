using GraphQL.Core.Entities;
using GraphQL.Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Data
{
    public class CatalogContext : ICatalogContext
    {
        private readonly IMongoDatabase _database;

        public CatalogContext(IOptions<MongoDbConfiguration> mongoDbConfiguration)
        {
            var client = new MongoClient(mongoDbConfiguration.Value.ConnectionString);
            _database = client.GetDatabase(mongoDbConfiguration.Value.Database);

            CatalogContextSeed.SeedData(_database);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
            => _database.GetCollection<T>(name);
    }

}
