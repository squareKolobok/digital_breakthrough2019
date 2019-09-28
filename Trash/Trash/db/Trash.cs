namespace Trash.db
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Trash : DbContext
    {
        public Trash()
            : base("name=Trash")
        {
        }

        public virtual DbSet<t_res> t_res { get; set; }
        public virtual DbSet<t_tip> t_tip { get; set; }
        public virtual DbSet<t_trash> t_trash { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<t_tip>()
                .HasMany(e => e.t_res)
                .WithOptional(e => e.t_tip)
                .HasForeignKey(e => e.tip_id);

            modelBuilder.Entity<t_trash>()
                .HasMany(e => e.t_res)
                .WithOptional(e => e.t_trash)
                .HasForeignKey(e => e.owner_id);
        }
    }
}
