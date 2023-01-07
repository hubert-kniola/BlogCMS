using GraphQL.Core.Entities;

namespace GraphQL.Core.Services
{
    public interface IMenuItemService
    {
        Task<MenuItem> AddMenuItem(MenuItem menuItem);
        Task<MenuItem?> UpdateMenuItem(MenuItem menuItem);
    }
}
