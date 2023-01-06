using GraphQL.Core.Services;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class DummyDataQuery
    {
        public async Task<bool> GetDummyData([Service] IDummyDataService dummyDataService) => await dummyDataService.Execute();
    }
}
