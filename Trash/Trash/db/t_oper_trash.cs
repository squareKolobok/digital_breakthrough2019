namespace Trash.db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class t_oper_trash
    {
        public int id { get; set; }

        public int oper_id { get; set; }

        public int owner_id { get; set; }

        public int tip_id { get; set; }

        public virtual t_operators t_operators { get; set; }

        public virtual t_tip t_tip { get; set; }

        public virtual t_trash t_trash { get; set; }
    }
}
