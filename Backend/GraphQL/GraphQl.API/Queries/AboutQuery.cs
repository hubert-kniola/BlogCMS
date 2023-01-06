using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class AboutQuery
    {
        public Task<IEnumerable<About>> GetAbout([Service] IAboutRepository aboutRepository) => aboutRepository.GetAllAsync();
        public Task<About> GetAboutById(string id, [Service] IAboutRepository aboutRepository) => aboutRepository.GetByIdAsync(id);
    }
}
