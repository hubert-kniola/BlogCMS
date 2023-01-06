namespace GraphQL.Core.Entities
{
    public class ContactForm : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
    }
}
