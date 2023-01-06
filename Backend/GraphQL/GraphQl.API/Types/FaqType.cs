using GraphQL.API.Resolver;
using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class FaqType : ObjectType<Faq>
    {
        protected override void Configure(IObjectTypeDescriptor<Faq> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Question);
            descriptor.Field(_ => _.Answer);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);
        }
    }
}
