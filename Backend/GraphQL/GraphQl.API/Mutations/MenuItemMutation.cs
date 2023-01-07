using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class MenuItemMutation
    {
        public async Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, [Service] IMenuItemService menuItemService) =>
            await menuItemService.AddMenuItem(menuItem);

        public async Task<MenuItem?> UpdateMenuItemAsync(MenuItem menuItem, [Service] IMenuItemService menuItemService) =>
            await menuItemService.UpdateMenuItem(menuItem);

        public async Task<bool> DeleteAllMenuItemAsync([Service] IMenuItemReposiotry menuItemRepository) =>
            await menuItemRepository.RemoveAllAsync();

    }
}
