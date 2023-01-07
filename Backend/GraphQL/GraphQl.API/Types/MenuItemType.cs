using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class MenuItemType : ObjectType<MenuItem>
    {
        protected override void Configure(IObjectTypeDescriptor<MenuItem> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Path);
            descriptor.Field(_ => _.ObjectType);
            descriptor.Field(_ => _.SubMenu);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);
        }
    }
}
