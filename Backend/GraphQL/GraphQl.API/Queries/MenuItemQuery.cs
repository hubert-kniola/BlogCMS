using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class MenuItemQuery
    {
        public async Task<MenuItem?> GetMenuItem([Service] IMenuItemReposiotry menuItemReposiotry) => 
            (await menuItemReposiotry.GetAllAsync()).FirstOrDefault();
    }
}
