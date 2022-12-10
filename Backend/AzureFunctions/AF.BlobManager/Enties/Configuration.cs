using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AF.BlobManager.Enties
{
    public class Configuration
    {
        public string AzureWebJobsStorage { get; set; }
        public string ContainerName { get; set; }
    }
}
