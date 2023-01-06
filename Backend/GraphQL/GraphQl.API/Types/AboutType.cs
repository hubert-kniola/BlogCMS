using GraphQL.API.Resolver;
using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class AboutType : ObjectType<About>
    {
        protected override void Configure(IObjectTypeDescriptor<About> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Text);
            descriptor.Field(_ => _.ImgName);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);

        }
    }
}
