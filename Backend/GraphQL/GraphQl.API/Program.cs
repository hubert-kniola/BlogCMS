using GraphQL.API.Mutations;
using GraphQL.API.Queries;
using GraphQL.API.Resolver;
using GraphQL.API.Types;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using GraphQL.Infrastructure.Configuration;
using GraphQL.Infrastructure.Data;
using GraphQL.Infrastructure.Repositories;
using GraphQL.Infrastructure.Services;
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
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICatalogContext, CatalogContext>(); 
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IAboutRepository, AboutRepository>();
builder.Services.AddScoped<IContactInfoRepository, ContactInfoRepository>();
builder.Services.AddScoped<IContactFormRepository, ContactFormRepository>();
builder.Services.AddScoped<ICarouselRepository, CarouselRepository>();
builder.Services.AddScoped<IFaqReposiotry, FaqRepository>();
builder.Services.AddScoped<IContentRepository, ContentRepository>();

//Services
builder.Services.AddScoped<IDummyDataService, DummyDataService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IContentService, ContentService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader();
        });
});

//GraphQL
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType(d => d.Name("Query"))
        .AddTypeExtension<DummyDataQuery>()
        .AddTypeExtension<PostQuery>()
        .AddTypeExtension<CategoryQuery>()
        .AddTypeExtension<AboutQuery>()
        .AddTypeExtension<ContactInfoQuery>()
        .AddTypeExtension<ContactFormQuery>()
        .AddTypeExtension<CarouselQuery>()
        .AddTypeExtension<FaqQuery>()
        .AddTypeExtension<ContentQuery>()
    .AddMutationType(d => d.Name("Mutation"))
        .AddTypeExtension<PostMutation>()
        .AddTypeExtension<CategoryMutation>()
        .AddTypeExtension<AboutMutation>()
        .AddTypeExtension<ContactInfoMutation>()
        .AddTypeExtension<ContactFormMutation>()
        .AddTypeExtension<CarouselMutation>()
        .AddTypeExtension<FaqMutation>()
        .AddTypeExtension<ContentMutation>()
    .AddType<PostType>()
    .AddType<CategoryType>()
    .AddType<CategoryResolver>()
    .AddType<PostResolver>()
    .AddType<AboutType>()
    .AddType<ContactInfoType>()
    .AddType<ContactFormType>()
    .AddType<CarouselType>()
    .AddType<FaqType>()
    .AddFiltering();
    


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

app.UseCors(x => x
    .WithOrigins("*")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
    );

app.UseEndpoints(endpoint =>
{
    endpoint.MapGraphQL("/api");
});

app.UseHttpsRedirection();

app.Run();
