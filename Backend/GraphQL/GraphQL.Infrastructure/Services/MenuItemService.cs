using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class MenuItemService : IMenuItemService
    {
        private IMenuItemReposiotry _menuItemRepository;

        public MenuItemService(IMenuItemReposiotry menuItemRepository)
        {
            _menuItemRepository = menuItemRepository;
        }

        public async Task<MenuItem> AddMenuItem(MenuItem menuItem)
        {
            menuItem = await GeneratePath(menuItem);
            return await _menuItemRepository.InsertAsync(menuItem);
        }

        public async Task<MenuItem?> UpdateMenuItem(MenuItem menuItem)
        {
            menuItem = await GeneratePath(menuItem);
            return await _menuItemRepository.UpdateAsync(menuItem);
        }

        private Task<MenuItem> GeneratePath(MenuItem menuItem, string? parentPath = null)
        {
            if (!string.IsNullOrEmpty(parentPath))
            {
                menuItem.Path = $"{parentPath.TrimEnd('/')}/{menuItem.Path.TrimStart('/')}";
            }

            if (menuItem.SubMenu != null)
            {
                foreach (var item in menuItem.SubMenu)
                {
                    GeneratePath(item, menuItem.Path);
                }
            }

            return Task.FromResult(menuItem);
        }
    }
}
