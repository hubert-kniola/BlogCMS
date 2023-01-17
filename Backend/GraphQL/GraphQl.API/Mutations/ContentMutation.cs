using GraphQL.Core.Entities;
using GraphQL.Infrastructure.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class ContentMutation
    {
        public async Task<IEnumerable<Content>?> CreateFooterContentAsync(IEnumerable<Content> contentList, [Service] IContentService contentService)
            => await contentService.CreateFooterContent(contentList);

        public async Task<Content?> CreateLastPostTieleContentAsync (Content content, [Service] IContentService contentService)
            => await contentService.CreateLastPostTitleContent(content);

        public async Task<IEnumerable<Content>?> UpdateFooterContentAsync(IEnumerable<Content> contentList, [Service] IContentService contentService)
            => await contentService.UpdateFooterContent(contentList);

        public async Task<Content?> UpdateLastPostTieleContentAsync(Content content, [Service] IContentService contentService)
            => await contentService.UpdateLastPostTitleContent(content);

    }
}
