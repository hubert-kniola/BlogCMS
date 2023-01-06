﻿using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace GraphQL.API.Queries
{
    [ExtendObjectType(name: "Query")]
    [Authorize]
    public class CategoryQuery
    {
        public async Task<IEnumerable<Category>> GetCategory([Service] ICategoryRepository categoryRepository) => await categoryRepository.GetAllAsync();
    }
}
