using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class FaqQuery
    {
        public async Task<IEnumerable<Faq>> GetAllFaq([Service] IFaqReposiotry faqReposiotry) =>
            await faqReposiotry.GetAllAsync();

    }
}
