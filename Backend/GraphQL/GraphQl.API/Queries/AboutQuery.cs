using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class AboutQuery
    {
        public async Task<IEnumerable<About>> GetAbout([Service] IAboutRepository aboutRepository) => await aboutRepository.GetAllAsync();
    }
}
