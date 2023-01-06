using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Data;

namespace GraphQL.Infrastructure.Repositories
{
    public class ContactFormRepository : BaseRepository<ContactForm>, IContactFormRepository
    {
        public ContactFormRepository(ICatalogContext catalogContext) : base(catalogContext)
        {

        }

    }
}
