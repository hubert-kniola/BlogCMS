using GraphQL.Core.Entities;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Data
{
    public interface ICatalogContext
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
