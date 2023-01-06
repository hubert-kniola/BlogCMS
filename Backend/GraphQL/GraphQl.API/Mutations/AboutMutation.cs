using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class AboutMutation
    {
        public async Task<About> CreateAboutAsync(About about, [Service] IAboutRepository aboutRepository) =>
            await aboutRepository.InsertAsync(about);

        public async Task<About?> UpdateAboutAsync(About about, [Service] IAboutRepository aboutRepository) =>
            await aboutRepository.UpdateAsync(about);
    }
}
