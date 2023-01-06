namespace GraphQL.Core.Entities
{
    public class content : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IEnumerable<TextBox> TextBoxes { get; set; }
    }
}
