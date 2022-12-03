using GraphQL.API.Mutations;
using GraphQL.API.Queries;
using GraphQL.API.Resolver;
using GraphQL.API.Types;
using GraphQL.Core.Repository;
using GraphQL.Infrastructure.Configuration;
using GraphQL.Infrastructure.Data;
using GraphQL.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//Configuration
builder.Services
            .Configure<MongoDbConfiguration>(builder.Configuration.GetSection(nameof(MongoDbConfiguration)));

//Repository
builder.Services.AddSingleton<ICatalogContext, CatalogContext>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();

//GraphQL
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType(d => d.Name("Query"))
        .AddTypeExtension<PostQuery>()
        .AddTypeExtension<CategoryQuery>()
    .AddMutationType(d => d.Name("Mutation"))
        .AddTypeExtension<PostMutation>()
        .AddTypeExtension<CategoryMutation>()
    .AddType<PostType>()
    .AddType<CategoryType>()
    .AddType<CategoryResolver>()
    .AddType<PostResolver>();


builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("R7cSHTaDb1GsBkpG5DeBkJ8GhTErIFuM")),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidTypes = new[] { "JWT" }
                };

            });

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoint =>
{
    endpoint.MapGraphQL("/api");
});

app.UseHttpsRedirection();

app.Run();
