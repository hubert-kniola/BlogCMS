namespace GraphQL.Core.Entities
{
    public class Faq : BaseEntity
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
