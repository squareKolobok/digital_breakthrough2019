using System.Collections.Generic;
using System.Web.Http;
using Trash.ContrAndDB;
using Trash.Models;

namespace Trash.Controllers
{
    public class OperatorController : ApiController
    {
        private static readonly TrashDb db = TrashDb.trash;

        [Route("api/Operator/{id:int}")]
        [HttpGet]
        public List<trashObj> Get(int id)
        {
            return db.GetTrashOperator(id);
        }
    }
}
