namespace Trash.db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class t_user_trash
    {
        public int id { get; set; }

        public int user_id { get; set; }

        public int tip_id { get; set; }

        public int owner_id { get; set; }

        public DateTime? dt { get; set; }

        public int? val_user { get; set; }

        public virtual t_tip t_tip { get; set; }

        public virtual t_trash t_trash { get; set; }

        public virtual t_users t_users { get; set; }
    }
}
