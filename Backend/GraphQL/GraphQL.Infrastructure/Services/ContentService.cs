using GraphQL.Core.Entities;
using GraphQL.Core.Repository;

namespace GraphQL.Infrastructure.Services
{
    public class ContentService : IContentService
    {
        private readonly IContentRepository _contentRepository;

        public ContentService(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }


        public async Task<IEnumerable<Content>?> CreateFooterContent(IEnumerable<Content> contentList)
        {
            foreach (var content in contentList)
            {
                content.Type = ContentType.Footer;
                content.CreatedOn = DateTime.Now;
                content.ModifiedOn = DateTime.Now;
            }

            return await _contentRepository.InsertManyAsync(contentList);
        }

        public async Task<Content?> CreateLastPostTitleContent(Content content)
        {
            content.Type = ContentType.LastPost;
            content.CreatedOn = DateTime.Now;
            content.ModifiedOn = DateTime.Now;

            return await _contentRepository.InsertAsync(content);
        }

        public async Task<IEnumerable<Content>?> UpdateFooterContent(IEnumerable<Content> contentList)
        {
            List<Content> updatedContentList = new();
            foreach (var content in contentList)
            {
                content.Type = ContentType.Footer;
                var updatedContent = await _contentRepository.UpdateAsync(content);

                if (updatedContent == null)
                    return null;
                else
                    updatedContentList.Add(updatedContent);
            }

            return updatedContentList;
        }

        public async Task<Content?> UpdateLastPostTitleContent(Content content)
        {
            content.Type = ContentType.Footer;
            var updatedContent = await _contentRepository.UpdateAsync(content);

            if (updatedContent == null)
                return null;

            return updatedContent;
        }

    }
}
