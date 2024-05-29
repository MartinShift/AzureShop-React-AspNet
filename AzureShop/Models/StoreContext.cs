using Microsoft.EntityFrameworkCore;

namespace AzureShop.Models
{
    public class StoreContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public StoreContext(DbContextOptions<StoreContext> options)
      : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>();
            modelBuilder.Entity<Category>();
            modelBuilder.HasDefaultContainer("StoreContainer");
        }
    }
}
