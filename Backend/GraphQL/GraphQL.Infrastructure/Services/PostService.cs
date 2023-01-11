using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;
        private ICategoryRepository _categoryRepository;
        public PostService(IPostRepository postRepository, ICategoryRepository categoryRepository)
        {
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<Post?> InsertAsync(Post post)
        {
            if (IsValidPost(post))
            {
                foreach (var cat in post.Categories)
                {
                    var category = await _categoryRepository.GetByIdAsync(cat);
                    if (category == null)
                        return null;
                }
                return await _postRepository.InsertAsync(post);
            }
            return null;
        }

        public async Task<Post?> UpdateAsync(Post post)
        {
            if (IsValidPost(post))
            {
                return await _postRepository.UpdateAsync(post);
            }
            return null;
        }

        public async Task<bool> UpdateDeletedCategory(string categoryId, string? parentCategoryId = null)
        {
            if (!string.IsNullOrEmpty(categoryId))
            {
                List<Category> categoryList = new(await _categoryRepository.GetCategoriesByParentId(categoryId));

                if (categoryList != null && categoryList.Any())
                {
                    foreach (var category in categoryList)
                    {
                        List<Post> postList = new(await _postRepository.GetAllByCategoryId(categoryId));

                        if (postList != null && postList.Any())
                        {
                            foreach (var post in postList)
                            {
                                List<string> newCategories = new();
                                foreach (var c in post.Categories)
                                {
                                    if (c != category.Id)
                                    {
                                        newCategories.Add(c);
                                    }
                                }

                                if (!string.IsNullOrEmpty(parentCategoryId) && !newCategories.Contains(parentCategoryId))
                                    newCategories.Add(parentCategoryId);

                                post.Categories = newCategories;
                                post.ModifiedOn = DateTime.Now;

                                var updatedPost = await _postRepository.UpdateAsync(post);
                                if (updatedPost == null)
                                    return false;
                            }
                        }
                    }
                    return true;

                }

            }

            return false;
        }

        private static bool IsValidPost(Post post)
        {
            if (post == null
               || string.IsNullOrEmpty(post.Title)
               || string.IsNullOrEmpty(post.Content)
               || string.IsNullOrEmpty(post.Snippet)
               || string.IsNullOrEmpty(post.PrimaryImgName)
               || string.IsNullOrEmpty(post.TimeToReadInMs)
               || post.Categories == null
               )
            {
                return false;
            }
            return true;
        }
    }
}
