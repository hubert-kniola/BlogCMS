using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Mutations
{
    [ExtendObjectType(name:"Mutation")]
    [Authorize]
    public class PostMutation
    {
        public Task<Post> CreateProductAsync(Post product, [Service] IPostRepository productRepository) =>
            productRepository.InsertAsync(product);

        public Task<bool> RemoveProductAsync(string id, [Service] IPostRepository productRepository) =>
            productRepository.RemoveAsync(id);
    }
}
