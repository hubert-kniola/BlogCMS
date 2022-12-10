using System.Collections.Generic;
using System.Net;

namespace AF.BlobManager.Enties.Response
{
    public class UploadFileResponse : BaseResponse
    {
        public int FilesReceived { get; set; }
        public int FilesAddedToBlob { get; set; }
        public List<File> FileNames { get; set; }
    }
}
