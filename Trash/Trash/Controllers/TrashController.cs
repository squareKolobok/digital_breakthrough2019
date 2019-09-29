using System.Collections.Generic;
using System.Web.Http;
using Trash.ContrAndDB;
using Trash.Models;

namespace Trash.Controllers
{
    public class TrashController : ApiController
    {
        private static readonly TrashDb db = TrashDb.trash;

        [HttpGet]
        public List<trashObj> Get()
        {
            return db.GetTrash();
        }

        
        [Route("api/TrashFilter")]
        [HttpPost]
        public List<trashObj> GetFilter([FromBody]List<int> filter)
        {
            if (filter == null || filter.Count == 0)
            {
                //return null;
                return new List<trashObj>();
            }
                    

            return db.GetTrashFilter(filter);
        }
        
        /*
        [Route("api/TrashFilter")]
        [HttpPost]
        public string GetFilter([FromBody]string filter)
        {
            return filter;
        }*/
    }
}
