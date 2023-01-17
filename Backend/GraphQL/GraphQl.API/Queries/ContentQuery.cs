using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class ContentQuery
    {
        public async Task<IEnumerable<Content>> GetFooterContentAsync([Service] IContentRepository contentRepository)
            => await contentRepository.GetContentByTypeAsync(ContentType.Footer);

        public async Task<Content?> GetLastPostTitleContentAsync([Service] IContentRepository contentRepository)
            => (await contentRepository.GetContentByTypeAsync(ContentType.LastPost)).FirstOrDefault();
    }
}
