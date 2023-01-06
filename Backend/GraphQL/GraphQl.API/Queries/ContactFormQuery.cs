using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class ContactFormQuery
    {
        public async Task<IEnumerable<ContactForm>> GetContactForms([Service] IContactFormRepository contactFormRepository) => await contactFormRepository.GetAllAsync();
    }
}
