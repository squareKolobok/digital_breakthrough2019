using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Trash.Models
{
    public class Res
    {
        public int id { get; set; }

        public int? ownerId { get; set; }

        public int? tipId { get; set; }

        public int? val { get; set; }
    }
}