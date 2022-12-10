using System.Collections.Generic;

namespace AF.BlobManager.Enties.Response
{
    public class DeleteFileResponse : BaseResponse
    {
        public int FilesReceived { get; set; }
        public int DeletedFilesCount { get; set; }

        public List<string> DeletedFiles { get; set; }
        public int UndeletedFilesCount { get; set; }

        public List<string> UndeletedFiles { get; set; }
    }
}
