using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class ContactInfoMutation
    {
        public async Task<ContactInfo> CreateContactInfoAsync(ContactInfo ContactInfo, [Service] IContactInfoRepository contactInfoRepository) => 
            await contactInfoRepository.InsertAsync(ContactInfo);

        public async Task<ContactInfo?> UpdateContactInfoAsync(ContactInfo ContactInfo, [Service] IContactInfoRepository contactInfoRepositor) =>
            await contactInfoRepositor.UpdateAsync(ContactInfo);
    }
}
