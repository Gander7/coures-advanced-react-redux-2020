
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.lib
{
    public class JsonRes
    {
        public static JsonResult Create(int statusCode, dynamic data)
        {
            var json = new JsonResult(new {
                statusCode = statusCode.ToString(),
                data = data
            });
            json.StatusCode = statusCode;
            return json;
        }
    }
}