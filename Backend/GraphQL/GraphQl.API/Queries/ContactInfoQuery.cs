using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class ContactInfoQuery
    {
        public async Task<ContactInfo?> GetContactInfo([Service] IContactInfoRepository contactInfoRepository) => (await contactInfoRepository.GetAllAsync()).FirstOrDefault();
    }
}
