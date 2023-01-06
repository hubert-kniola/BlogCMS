using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class AboutMutation
    {
        public Task<About> CreateAboutAsync(About about, [Service] IAboutRepository aboutRepository) =>
            aboutRepository.InsertAsync(about);

        public Task<About?> UpdateAboutAsync(About about, [Service] IAboutRepository aboutRepository) =>
            aboutRepository.UpdateAsync(about);

        public Task<bool> RemoveAboutAsync(string id, [Service] IAboutRepository aboutRepository) =>
            aboutRepository.RemoveAsync(id);
    }
}
