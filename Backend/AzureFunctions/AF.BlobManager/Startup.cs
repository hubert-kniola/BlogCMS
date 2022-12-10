using AF.BlobManager.Enties;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(AF.BlobManager.Startup))]

namespace AF.BlobManager
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddOptions<Configuration>()
                .Configure<IConfiguration>((settings, configuration) =>
                {
                    configuration.GetSection("Azure").Bind(settings);
                });
        }
    }
}
