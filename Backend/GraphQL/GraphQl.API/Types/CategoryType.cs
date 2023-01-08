using GraphQL.API.Resolver;
using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class CategoryType : ObjectType<Category>
    {
        protected override void Configure(IObjectTypeDescriptor<Category> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Path);
            descriptor.Field(_ => _.ParentId);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);

            descriptor.Field<CategoryResolver>(_ => _.GetSubCategoryAsync(default, default));
        }
    }
}