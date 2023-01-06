using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name:"Mutation")]
    [Authorize]
    public class PostMutation
    {
        public async Task<Post> CreateProductAsync(Post product, [Service] IPostRepository productRepository) =>
            await productRepository.InsertAsync(product);

        public async Task<bool> RemoveProductAsync(string id, [Service] IPostRepository productRepository) =>
            await productRepository.RemoveAsync(id);
    }
}
