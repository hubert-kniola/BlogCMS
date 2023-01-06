using GraphQL.API.Resolver;
using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class ContactFormType : ObjectType<ContactForm>
    {
        protected override void Configure(IObjectTypeDescriptor<ContactForm> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Name);
            descriptor.Field(_ => _.Email);
            descriptor.Field(_ => _.Content);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);

            descriptor.Field<PostResolver>(_ => _.GetAllPosts(default, default));
        }
    }
}
