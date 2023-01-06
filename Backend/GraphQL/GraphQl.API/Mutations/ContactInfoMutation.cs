using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class ContactInfoMutation
    {
        public async Task<ContactInfo> CreateContactInfoAsync(ContactInfo contactInfo, [Service] IContactInfoRepository contactInfoRepository) => 
            await contactInfoRepository.InsertAsync(contactInfo);

        public async Task<ContactInfo?> UpdateContactInfoAsync(ContactInfo contactInfo, [Service] IContactInfoRepository contactInfoRepositor) =>
            await contactInfoRepositor.UpdateAsync(contactInfo);
    }
}
