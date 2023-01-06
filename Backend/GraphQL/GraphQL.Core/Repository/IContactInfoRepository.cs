using GraphQL.Core.Entities;

namespace GraphQL.Core.Repository
{
    public interface IContactInfoRepository : IBaseRepository<ContactInfo>
    {
        Task<ContactInfo?> UpdateAsync(ContactInfo entity);
    }
}
