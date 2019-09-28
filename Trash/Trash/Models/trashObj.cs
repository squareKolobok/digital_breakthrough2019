using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Trash.db;

namespace Trash.Models
{
    public class trashObj
    {
        public int id { get; set; }

        public ICollection<Res> res { get; set; }

        public double? x { get; set; }

        public double? y { get; set; }
    }
}