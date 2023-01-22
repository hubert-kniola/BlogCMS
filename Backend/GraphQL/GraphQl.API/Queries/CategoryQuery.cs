using GraphQL.API.Types;
using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class CategoryQuery
    {
        [UseFiltering]
        public async Task<IEnumerable<Category>> GetCategory([Service] ICategoryRepository categoryRepository)
            => await categoryRepository.GetAllAsync();

        public async Task<IEnumerable<Category>?> GetAllSubCategories(string categoryId, [Service] ICategoryService categoryService)
            => await categoryService.GetAllSubCategories(categoryId);

        [UseFiltering]
        public async Task<IEnumerable<Category>?> GetAllSubCategoriesByPath(string path, [Service] ICategoryService categoryService)
            => await categoryService.GetAllSubCategoriesByPath(path);

        public async Task<IEnumerable<Category>?> GetAllTags(string categoryId, [Service] ICategoryService categoryService)
            => await categoryService.GetTags(categoryId);
    }

    public class CategoryQueryType : ObjectType<CategoryQuery>
    {
        protected override void Configure(IObjectTypeDescriptor<CategoryQuery> descriptor)
        {
            descriptor
                .Field(f => f.GetCategory(default))
                .Type<ListType<NonNullType<CategoryType>>>()
                .UseFiltering();
        }

    }
}
