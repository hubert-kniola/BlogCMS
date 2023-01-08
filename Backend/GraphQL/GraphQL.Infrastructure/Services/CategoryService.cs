using GraphQL.Core.Entities;
using GraphQL.Core.Repository;

namespace GraphQL.Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
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
            if (!string.IsNullOrEmpty(id) && (await _categoryRepository.GetByIdAsync(id) != null))
            {
                List<Category> categories = new(await GetAllSubCategories(id));

                if (categories.Count > 0)
                {
                    bool succcess = false;
                    foreach (var c in categories)
                    {
                        succcess = await _categoryRepository.RemoveAsync(c.Id);

                        if (!succcess)
                            break;
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
            string id = ":id";
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

        private async Task<IEnumerable<Category>> GetAllSubCategories(string categoryId)
        {
            List<Category> categories = new();

            Category category = await _categoryRepository.GetByIdAsync(categoryId);

            categories.Add(category);

            List<Category> subCategories = new(await GetSubCategories(category.Id));

            categories.AddRange(subCategories);

            return categories;

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
