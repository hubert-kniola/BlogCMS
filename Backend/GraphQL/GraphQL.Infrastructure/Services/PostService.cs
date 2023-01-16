using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;
        private ICategoryRepository _categoryRepository;
        private ICategoryService _categoryService;
        public PostService(IPostRepository postRepository, ICategoryRepository categoryRepository, ICategoryService categoryService)
        {
            _postRepository = postRepository;
            _categoryRepository = categoryRepository;
            _categoryService = categoryService;
        }

        public async Task<IEnumerable<Post>?> GetSimilarPostAsync(string postId)
        {
            if (!string.IsNullOrEmpty(postId))
            {
                List<Category> categoryList = new();
                List<Post> similarPosts = new();
                Post? post = await _postRepository.GetByIdAsync(postId);

                if (post != null)
                {
                    foreach (var categoryId in post.Categories)
                    {
                        var categories = await _categoryService.GetAllSubCategories(categoryId);

                        if (categories != null)
                            categoryList.AddRange(categories);
                    }

                    foreach (var category in categoryList)
                    {
                        IEnumerable<Post>? postList = await _postRepository.GetAllByCategoryId(category.Id!);
                        if (postList != null)
                        {
                            foreach (var p in postList)
                            {
                                if (p.Id != postId && !similarPosts.Contains(p))
                                {
                                    similarPosts.Add(p);

                                    if (similarPosts.Count == 3)
                                        break;
                                }
                            }
                        }

                        if (similarPosts.Count == 3)
                            return similarPosts;
                    }
                }
                return similarPosts;
            }
            return null;
        }

        public async Task<IEnumerable<Post>?> GetPostByCategoryIdAsync(string categoryId)
        {
            if (!string.IsNullOrEmpty(categoryId))
            {
                List<Post> postList = new();

                var categoryList = await _categoryService.GetAllSubCategories(categoryId);

                if (categoryList != null)
                {
                    foreach (var category in categoryList)
                    {
                        IEnumerable<Post>? posts = await _postRepository.GetAllByCategoryId(category.Id!);
                        if (posts != null)
                        {
                            foreach (var post in posts)
                            {
                                if (!postList.Contains(post))
                                {
                                    postList.Add(post);
                                }
                            }
                        }
                    }
                    return postList;
                }
            }
            return null;
        }

        public async Task<Post?> InsertAsync(Post post)
        {
            if (IsValidPost(post))
            {
                post = SetDefaultValue(post);

                if (!post.Categories.Any())
                {
                    string? categoryId = await _categoryRepository.GetMainPostCategoryId();
                    if (string.IsNullOrEmpty(categoryId))
                        return null;
                    post.Categories = new List<string>() { categoryId };
                }
                else
                {
                    foreach (var cat in post.Categories)
                    {
                        var category = await _categoryRepository.GetByIdAsync(cat);
                        if (category == null)
                            return null;
                    }
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
               || string.IsNullOrEmpty(post.TimeToReadInMs)
               )
            {
                return false;
            }
            return true;
        }

        private static Post SetDefaultValue(Post post)
        {
            post.IsTopPost ??= false;
            post.PublicationDate ??= post.PublicationDate = DateTime.Now;

            return post;
        }
    }
}
