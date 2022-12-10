using AF.BlobManager.Enties;
using AF.BlobManager.Enties.Response;
using Azure;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AF.BlobManager
{
    public class FileUpload
    {
        private const string _imageContentType = "image/";
        private readonly Configuration _config;
        public FileUpload(IOptions<Configuration> config)
        {
            _config = config.Value;
        }

        [FunctionName(nameof(FileUpload))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            List<Enties.File> filesAddedToBlob = new();

            try
            {
                log.LogInformation($"{nameof(FileUpload)}: The function has started working");

                List<IFormFile> files = req.Form.Files.ToList();
                BlobContainerClient blobClient = new(_config.AzureWebJobsStorage, _config.ContainerName);

                log.LogInformation($"{nameof(FileUpload)}: Processing {files.Count} files");

                foreach (var file in files)
                {
                    if (!file.ContentType.StartsWith(_imageContentType))
                        continue;

                    string newFileName = $"{Guid.NewGuid()}.{file.FileName.Split('.').LastOrDefault()}";
                    Stream myBlob = file.OpenReadStream();
                    BlobClient blob = blobClient.GetBlobClient(newFileName);

                    await blob.UploadAsync(myBlob);

                    filesAddedToBlob.Add(new Enties.File()
                    {
                        OriginalName = file.FileName,
                        NewName = newFileName
                    });
                }

                log.LogInformation($"{nameof(FileUpload)}: Added {files.Count} files to blobStorage");
                return new OkObjectResult(
                    new UploadFileResponse()
                    {
                        HttpStatusCode = HttpStatusCode.OK,
                        FilesReceived = files.Count,
                        FilesAddedToBlob = filesAddedToBlob.Count,
                        FileNames = filesAddedToBlob,
                        Message = "The files have been added"
                    });
            }
            catch (RequestFailedException ex)
            {
                log.LogError($"{nameof(FileUpload)} (ERROR): {ex.Message}");
                return new ContentResult() { StatusCode = ex.Status, Content = ex.Message };
            }
            catch (Exception ex)
            {
                log.LogError($"{nameof(FileUpload)} (ERROR): {ex.Message}");
                if (ex is HttpRequestException)
                    return new BadRequestObjectResult(ex.Message);

                return new ContentResult() { StatusCode = 500, Content = ex.Message };
            }
        }
    }
}
