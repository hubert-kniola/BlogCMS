using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<IEnumerable<Category>> GetCategoriesByParentId(string parentId)
        {
            return (await _collection.FindAsync(x => x.ParentId.Equals(parentId))).ToEnumerable();
        }

        public async Task<string?> GetMainPostCategoryId()
        {
            return  (await _collection.Find(x => x.ParentId == null && x.IsConst == false).FirstOrDefaultAsync())?.Id;
        }
    }
}
