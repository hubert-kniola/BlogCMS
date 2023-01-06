namespace GraphQL.Core.Entities
{
    public class Carousel : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublicationDate { get; set; }
        public string ImgName { get; set; }
        public bool Active { get; set; }
    }
}
