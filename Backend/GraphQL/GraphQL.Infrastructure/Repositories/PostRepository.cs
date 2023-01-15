using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Common;
using GraphQL.Infrastructure.Data;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        private ICategoryRepository _categoryRepository;
        public PostRepository(
            ICatalogContext catalogContext,
            ICategoryRepository categoryRepository
            ) : base(catalogContext)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Post>?> GetAllByCategoryId(string categoryId)
        {
            return await _collection.Find(x => x.Categories.Contains(categoryId)).ToListAsync();
        }

        public async Task<IEnumerable<Post>?> GetTopPostAsync()
        {
            return await _collection.Find(x => x.IsTopPost == true).ToListAsync();
        }

        public async Task<Post?> GetFirstPostPremier()
        {
            List<Post> postList = new(await GetAllAsync());
            DateTime? nextFeatureDate = null;
            Post? premierePost = null;

            foreach (var post in postList)
            {
                if (nextFeatureDate == null)
                {
                    nextFeatureDate = post.PublicationDate;
                    premierePost = post;
                }
                else if (post.PublicationDate > DateTime.Now && post.PublicationDate < nextFeatureDate)
                {
                    nextFeatureDate = post.PublicationDate;
                    premierePost = post;
                }
            }

            return premierePost;
        }

        public async Task<Post?> UpdateAsync(Post entity)
        {
            if (entity.Id != null)
            {
                Post? oldEntity = await GetByIdAsync(entity.Id);

                if (oldEntity != null)
                {
                    oldEntity.Title = Helpers.GetValue(oldEntity.Title, entity.Title);
                    oldEntity.Content = Helpers.GetValue(oldEntity.Content, entity.Content);
                    oldEntity.Snippet = Helpers.GetValue(oldEntity.Snippet, entity.Snippet);
                    oldEntity.TimeToReadInMs = Helpers.GetValue(oldEntity.TimeToReadInMs, entity.TimeToReadInMs);
                    oldEntity.PrimaryImgName = Helpers.GetValue(oldEntity.PrimaryImgName, entity.PrimaryImgName);
                    oldEntity.IsTopPost = Helpers.GetValue(oldEntity.IsTopPost, entity.IsTopPost);
                    oldEntity.ContentImgName = entity.ContentImgName;
                    oldEntity.PublicationDate = entity.PublicationDate;
                    oldEntity.Categories = entity.Categories.Any() ? entity.Categories : new List<string>() { await _categoryRepository.GetMainPostCategoryId() };

                    oldEntity.ModifiedOn = DateTime.Now;

                    var filter = Builders<Post>.Filter.Eq(x => x.Id, entity.Id);
                    await _collection.ReplaceOneAsync(filter, oldEntity);

                    return await GetByIdAsync(entity.Id);
                }
            }
            return null;

        }

        public async Task<IEnumerable<Post>>? UpdateTopAsync(IEnumerable<string> top)
        {
            if (top != null && top.Any())
            {
                IEnumerable<Post> currentTopPosts = _collection.Find(x => x.IsTopPost == true).ToList();
                await UpdateTopPost(currentTopPosts, false);

                List<Post> newTop = new();
                foreach (var postId in top.Take(3))
                {
                    Post? tempPost = await _collection.Find(x => x.Id.Equals(postId)).FirstAsync();
                    if (tempPost != null)
                        newTop.Add(tempPost);
                }

                if (newTop.Count == top.Count() || newTop.Count == 3)
                {
                    await UpdateTopPost(newTop);
                    return await _collection.Find(x => x.IsTopPost == true).ToListAsync();
                }
            }
            return null;
        }

        private async Task UpdateTopPost(IEnumerable<Post> postList, bool isTop = true)
        {
            foreach (var post in postList)
            {
                post.IsTopPost = isTop;
                await _collection.ReplaceOneAsync(x => x.Id.Equals(post.Id), post);
            }
        }
    }
}
