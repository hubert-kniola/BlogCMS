using GraphQL.Core.Entities;

namespace GraphQL.API.Types
{
    public class CarouselType : ObjectType<Carousel>
    {
        protected override void Configure(IObjectTypeDescriptor<Carousel> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Content);
            descriptor.Field(_ => _.PublicationDate);
            descriptor.Field(_ => _.ImgName);
            descriptor.Field(_ => _.Active);
            descriptor.Field(_ => _.Url);
            descriptor.Field(_ => _.ModifiedOn);
            descriptor.Field(_ => _.CreatedOn);
        }
    }
}
