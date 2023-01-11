using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IPostService _postService;

        public CategoryService(
            ICategoryRepository categoryRepository,
            IPostService postService
            )
        {
            _categoryRepository = categoryRepository;
            _postService = postService;
        }

        public async Task<IEnumerable<Category>?> GetAllSubCategories(string categoryId)
        {
            List<Category> categories = new();
            if (!string.IsNullOrEmpty(categoryId))
            {
                Category? category = await _categoryRepository.GetByIdAsync(categoryId);
                if (category != null)
                {
                    categories.Add(category);

                    List<Category> subCategories = new(await GetSubCategories(category.Id));

                    categories.AddRange(subCategories);

                    return categories;
                }
            }

            return null;
        }

        public async Task<Category> AddCategory(Category category)
        {
            Category? parent = null;
            if (!string.IsNullOrEmpty(category.ParentId))
            {
                parent = await _categoryRepository.GetByIdAsync(category.ParentId);
                if (parent != null)
                {
                    category.Path = CombinePath(parent.Path, category.Path);
                }
            }

            if (category.ObjectType == null)
            {
                category.ObjectType = RouteObjectType.Category;
            }

            if (category.ObjectType == null)
            {
                category.IsConst = false;
            }

            category = await _categoryRepository.InsertAsync(category);

            if (category.IsConst == null || category.IsConst != true)
            {
                await AddPostCategory(new()
                {
                    Title = category.Title,
                    Path = category.Path,
                    ParentId = category.Id
                });
            }

            return category;
        }

        public async Task<bool> RemoveCategoryWithSubCategory(string id)
        {

            if (!string.IsNullOrEmpty(id))
            {
                Category? deletedCategory = await _categoryRepository.GetByIdAsync(id);
                if (deletedCategory != null)
                {
                    List<Category> categories = new(await GetAllSubCategories(id));

                    bool succcess = false;
                    if (categories.Count > 0)
                    {
                        foreach (var c in categories)
                        {
                            //succcess = await _postService.UpdateDeletedCategory(c.Id, deletedCategory.ParentId);

                            //if (!succcess)
                            //    break;

                            succcess = await _categoryRepository.RemoveAsync(c.Id);

                            if (!succcess)
                                break;
                        }
                    }
                    return succcess;
                }

            }
            return false;
        }

        private static string CombinePath(string parentPath, string itemPath)
        {
            if (!string.IsNullOrEmpty(parentPath))
            {
                itemPath = $"{parentPath.TrimEnd('/')}/{itemPath.TrimStart('/')}";
            }

            return itemPath;
        }

        private static string CombinePostPath(string path)
        {
            const string id = ":id";
            if (!string.IsNullOrEmpty(path) && !path.EndsWith(id))
            {
                path = $"{path.TrimEnd('/')}/{id}";
            }
            return path;
        }
        private async Task<Category> AddPostCategory(Category category)
        {
            category.Path = CombinePostPath(category.Path);
            category.ObjectType = RouteObjectType.Post;
            return await _categoryRepository.InsertAsync(category);
        }

        private async Task<IEnumerable<Category>> GetSubCategories(string categoryId)
        {
            List<Category> categories = new();

            List<Category> subCategories = new(await _categoryRepository.GetCategoriesByParentId(categoryId));

            if (subCategories.Count > 0)
            {
                foreach (var sub in subCategories)
                {
                    if (sub.Id != null)
                    {
                        categories.Add(sub);
                        List<Category> subSubCategories = new(await GetSubCategories(sub.Id));
                        if (subSubCategories.Count > 0)
                        {
                            categories.AddRange(subSubCategories);
                        }
                    }
                }
            }

            return categories;
        }
    }
}
