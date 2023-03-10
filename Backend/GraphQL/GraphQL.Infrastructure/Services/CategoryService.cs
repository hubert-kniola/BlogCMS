using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(
            ICategoryRepository categoryRepository
            )
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>?> GetAllSubCategories(string categoryId)
        {
            if (!string.IsNullOrEmpty(categoryId))
            {
                Category? category = await _categoryRepository.GetByIdAsync(categoryId);
                return await GetSubCategories(category); ;
            }

            return null;
        }

        public async Task<IEnumerable<Category>?> GetAllSubCategoriesByPath(string path)
        {
            if (!string.IsNullOrEmpty(path))
            {
                Category? category = await _categoryRepository.GetCategoryByPath(path);
                return await GetSubCategories(category);
            }

            return null;
        }

        public async Task<IEnumerable<Category>?> GetTags(string categoryId)
        {
            if (!string.IsNullOrEmpty(categoryId))
            {
                Category? category = await _categoryRepository.GetByIdAsync(categoryId);
                if (category != null)
                {
                    return new List<Category>(await GetSubCategories(category.Id!, true, (int)category.DeephLvl!));
                }
            }
            return null;
        }

        public async Task<CategoryTree?> GetCategoryTree(Post post)
        {
            List<Category> tags = new();
            Category? mainCategory = null;
            Category? subCategory = null;
            Category? firstTag;

            foreach (var categoryId in post.Categories)
            {
                Category? category = await _categoryRepository.GetByIdAsync(categoryId);
                if (category != null)
                {
                    tags.Add(category);
                }
            }

            if (!tags.Any())
                return null;

            firstTag = tags.First();

            if (firstTag != null && !string.IsNullOrEmpty(firstTag.ParentId))
                subCategory = await _categoryRepository.GetByIdAsync(firstTag.ParentId);

            if (subCategory != null && !string.IsNullOrEmpty(subCategory.ParentId))
                mainCategory = await _categoryRepository.GetByIdAsync(subCategory.ParentId);

            return new()
            {
                MainCategory = mainCategory,
                SubCategory = subCategory,
                Tags = tags,
            };
        }

        public async Task<Category?> AddCategory(Category category)
        {
            if (!(await _categoryRepository.IsExists(category)))
            {
                Category? parent;
                if (!string.IsNullOrWhiteSpace(category.ParentId))
                {
                    parent = await _categoryRepository.GetByIdAsync(category.ParentId);
                    if (parent != null)
                    {
                        category.DeephLvl = parent.DeephLvl + 1;
                        category.Path = CombinePath(parent.Path, category.Path);
                    }
                    else
                        category.DeephLvl = 0;
                }
                else
                    category.DeephLvl = 0;

                if (category.ObjectType == null)
                {
                    category.ObjectType = RouteObjectType.Category;
                    category.IsConst = false;
                }

                category = await _categoryRepository.InsertAsync(category);

                if (category.IsConst == null || category.IsConst != true)
                {
                    await AddPostCategory(new()
                    {
                        Title = category.Title,
                        Path = category.Path,
                        ParentId = category.Id,
                        DeephLvl = null
                    });
                }

                return category;
            }
            return null;
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

        private async Task<IEnumerable<Category>> GetSubCategories(string categoryId, bool isTag = false, int deepLvl = 0)
        {
            List<Category> categories = new();

            List<Category> subCategories = new(await _categoryRepository.GetCategoriesByParentId(categoryId));

            if (subCategories.Count > 0)
            {
                foreach (var sub in subCategories)
                {
                    if (sub.Id != null)
                    {
                        if (isTag && deepLvl == 3 || !isTag)
                            categories.Add(sub);

                        List<Category> subSubCategories = new(await GetSubCategories(sub.Id, isTag, deepLvl + 1));
                        if (subSubCategories.Count > 0)
                        {
                            categories.AddRange(subSubCategories);
                        }
                    }
                }
            }

            return categories;
        }
        private async Task<IEnumerable<Category>?> GetSubCategories(Category? category)
        {
            List<Category> categories = new();
            if (category != null)
            {
                categories.Add(category);

                List<Category> subCategories = new(await GetSubCategories(category.Id!, false));

                categories.AddRange(subCategories);

                return categories;
            }

            return null;
        }
    }
}
