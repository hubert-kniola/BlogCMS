using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class CategoryQuery
    {
        public async Task<ContactInfo?> GetCategory([Service] IContactInfoRepository contactInfoRepository) => (await contactInfoRepository.GetAllAsync()).FirstOrDefault();

    }
}
