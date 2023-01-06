using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class ContactInfoType : ObjectType<ContactInfo>
    {
        protected override void Configure(IObjectTypeDescriptor<ContactInfo> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Content);
            descriptor.Field(_ => _.TextBoxes);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);
        }
    }
}
