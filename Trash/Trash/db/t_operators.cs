namespace Trash.db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class t_operators
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public t_operators()
        {
            t_oper_trash = new HashSet<t_oper_trash>();
        }

        public int id { get; set; }

        [StringLength(1000)]
        public string name { get; set; }

        [StringLength(128)]
        public string kont_tel { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_oper_trash> t_oper_trash { get; set; }
    }
}
