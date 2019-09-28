namespace Trash.db
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class t_trash
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public t_trash()
        {
            t_res = new HashSet<t_res>();
        }

        public int id { get; set; }

        public double? x { get; set; }

        public double? y { get; set; }

        public int? battery { get; set; }

        public int? plastic { get; set; }

        public int? paper { get; set; }

        public int? glass { get; set; }

        public int? mercury { get; set; }

        public int? other { get; set; }

        public int? gid { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<t_res> t_res { get; set; }
    }
}
