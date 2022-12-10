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
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AF.BlobManager
{
    public class FileDeletion
    {
        private readonly Configuration _config;

        public FileDeletion(IOptions<Configuration> config)
        {
            _config = config.Value;
        }

        [FunctionName(nameof(FileDeletion))]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = null)] HttpRequest req,
            ILogger log)
        {
            string[] files = Array.Empty<string>();
            List<string> deletedFiles = new();
            List<string> undeletedFiles = new();

            try
            {
                log.LogInformation($"{nameof(FileDeletion)}: The function has started working");

                using (StreamReader responseReader = new(req.Body))
                {
                    string json = responseReader.ReadToEnd();
                    files = JsonConvert.DeserializeObject<string[]>(json);
                }

                BlobContainerClient blobClient = new(_config.AzureWebJobsStorage, _config.ContainerName);

                log.LogInformation($"{nameof(FileDeletion)}: Trying to delete {files.Length} files");

                foreach (var file in files)
                {
                    if (string.IsNullOrEmpty(file.Trim()))
                        continue;

                    BlobClient blob = blobClient.GetBlobClient(file);

                    bool deleted = await blob.DeleteIfExistsAsync();

                    if (deleted)
                    {
                        log.LogInformation($"{nameof(FileUpload)}: Deleted {file} file");
                        deletedFiles.Add(file);
                    }
                    else
                    {
                        log.LogWarning($"{nameof(FileUpload)}: Failed to delete {file} file. The file does not exist");
                        undeletedFiles.Add(file);
                    }
                }

                log.LogInformation($"{nameof(FileUpload)}: {deletedFiles.Count} files deleted. Failed to delete {undeletedFiles.Count}");
                return new OkObjectResult(
                    new DeleteFileResponse()
                    {
                        HttpStatusCode = HttpStatusCode.OK,
                        DeletedFilesCount = deletedFiles.Count,
                        DeletedFiles = deletedFiles,
                        UndeletedFilesCount = undeletedFiles.Count,
                        UndeletedFiles = undeletedFiles,
                        Message = ""
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
