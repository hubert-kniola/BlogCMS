using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class ContactFormMutation
    {
        public async Task<ContactForm> CreateContactFormAsync(ContactForm contactForm, [Service] IContactFormRepository contactFormRepository) =>
            await contactFormRepository.InsertAsync(contactForm);

        public async Task<bool> RemoveContactFormAsync(string id, [Service] IContactFormRepository contactFormRepository) =>
            await contactFormRepository.RemoveAsync(id);
    }
}
