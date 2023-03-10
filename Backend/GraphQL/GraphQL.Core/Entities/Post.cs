namespace GraphQL.Core.Entities
{
    public class Post : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Snippet { get; set; }
        public string TimeToReadInMs { get; set; }
        public string PrimaryImgName { get; set; }
        public IEnumerable<string> ContentImgName { get; set; }
        public DateTime? PublicationDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public bool? IsTopPost { get; set; } = false;
    }
}
