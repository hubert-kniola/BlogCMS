using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name: "Mutation")]
    [Authorize]
    public class FaqMutation
    {
        public async Task<Faq> CreateFaqAsync(Faq faq, [Service] IFaqReposiotry faqReposiotry) =>
            await faqReposiotry.InsertAsync(faq);

        public async Task<IEnumerable<Faq>> CreateManyFaqAsync(IEnumerable<Faq> faqs, [Service] IFaqReposiotry faqReposiotry) =>
             await faqReposiotry.InsertManyAsync(faqs);
        public async Task<Faq?> RemoveFaqAsync(Faq faq, [Service] IFaqReposiotry faqReposiotry) =>
           await faqReposiotry.UpdateAsync(faq);

        public async Task<bool> RemoveFaqAsync(string id, [Service] IFaqReposiotry faqReposiotry) =>
            await faqReposiotry.RemoveAsync(id);

        public async Task<bool> RemoveAllFaqAsync( [Service] IFaqReposiotry faqReposiotry) =>
            await faqReposiotry.RemoveAllAsync();
    }
}
