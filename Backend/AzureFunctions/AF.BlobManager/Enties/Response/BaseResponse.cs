using System.Net;

namespace AF.BlobManager.Enties.Response
{
    public class BaseResponse
    {
        public HttpStatusCode HttpStatusCode { get; set; }
        public string Message { get; set; }
    }
}
