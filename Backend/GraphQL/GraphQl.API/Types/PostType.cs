using GraphQL.API.Resolver;
using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class PostType : ObjectType<Post>
    {
        protected override void Configure(IObjectTypeDescriptor<Post> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title); 
            descriptor.Field(_ => _.Content);
            descriptor.Field(_ => _.Category);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);

            descriptor.Field<CategoryResolver>(_ => _.GetCategoryAsync(default, default));
        }
    }
}