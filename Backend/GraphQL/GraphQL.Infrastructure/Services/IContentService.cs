using GraphQL.Core.Entities;

namespace GraphQL.Infrastructure.Services
{
    public interface IContentService
    {
        Task<IEnumerable<Content>?> CreateFooterContent(IEnumerable<Content> content);
        Task<Content?> CreateLastPostTitleContent(Content content);
        Task<IEnumerable<Content>?> UpdateFooterContent(IEnumerable<Content> contentList);
        Task<Content?> UpdateLastPostTitleContent(Content content);
    }
}