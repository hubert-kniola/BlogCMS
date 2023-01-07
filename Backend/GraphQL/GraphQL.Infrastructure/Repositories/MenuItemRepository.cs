using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class MenuItemRepository : BaseRepository<MenuItem>, IMenuItemReposiotry
    {
        public MenuItemRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }

        public async Task<MenuItem?> UpdateAsync(MenuItem entity)
        {
            if (entity.Id != null)
            {
                MenuItem oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Title = Helpers.GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Path = Helpers.GetValue(oldEntity.Path, entity.Path);
                    oldEntity.ObjectType = Helpers.GetValue(oldEntity.ObjectType, entity.ObjectType);
                    oldEntity.ObjectType = Helpers.GetValue(oldEntity.ObjectType, entity.ObjectType);
                    oldEntity.SubMenu = Helpers.GetValue(oldEntity.SubMenu, entity.SubMenu);
                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<MenuItem>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }

            return null;
        }
    }
}
