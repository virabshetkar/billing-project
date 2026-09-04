using Contacts.Domain;
using Contacts.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Contacts.Infrastructure.Database;

public class AppDbContext : DbContext
{
    public DbSet<ContactModel> Contacts { get; set; } = null!;
    public DbSet<ProductModel> Products { get; set; } = null!;
    public DbSet<BillItemModel> BillItems { get; set; } = null!;
    public DbSet<BillModel> Bills { get; set; } = null!;

    public AppDbContext(DbContextOptions options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ContactModelMapping());
        modelBuilder.ApplyConfiguration(new ProductModelMapping());
        modelBuilder.ApplyConfiguration(new BillItemModelMapping());
        modelBuilder.ApplyConfiguration(new BillModelMapping());
    }

    public override int SaveChanges()
    {
        UpdateAuditFields();

        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditFields();

        return base.SaveChangesAsync(cancellationToken);
    }


    private void UpdateAuditFields()
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<IAuditable>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = now;
                    entry.Entity.UpdatedAt = now;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = now;
                    break;
            }
        }
    }
}


public class ContactModelMapping : IEntityTypeConfiguration<ContactModel>
{
    public void Configure(EntityTypeBuilder<ContactModel> builder)
    {
        builder.Property(c => c.Id).HasDefaultValueSql("gen_random_uuid()");

        builder.HasIndex(c => c.Email).IsUnique();
        builder.HasIndex(c => c.Phone).IsUnique();

        builder.HasKey(c => c.Id);
    }
}

public class ProductModelMapping : IEntityTypeConfiguration<ProductModel>
{
    public void Configure(EntityTypeBuilder<ProductModel> builder)
    {
        builder.Property(c => c.Id).HasDefaultValueSql("gen_random_uuid()");

        builder.HasIndex(c => c.Title).IsUnique();

        builder.HasKey(c => c.Id);
    }
}

public class BillItemModelMapping : IEntityTypeConfiguration<BillItemModel>
{
    public void Configure(EntityTypeBuilder<BillItemModel> builder)
    {
        builder.HasKey(x => new { x.BillId, x.ProductId });
        builder.HasOne(c => c.Product).WithMany(c => c.BillItems).HasForeignKey(c => c.ProductId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class BillModelMapping : IEntityTypeConfiguration<BillModel>
{
    public void Configure(EntityTypeBuilder<BillModel> builder)
    {
        builder.Property(c => c.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(c => c.Status).HasDefaultValue(BillStatus.Draft);

        builder.HasKey(c => c.Id);

        builder.HasMany(c => c.Items).WithOne(c => c.Bill).HasForeignKey(c => c.BillId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(c => c.Contact).WithMany(c => c.Bills).HasForeignKey(c => c.ContactId).OnDelete(DeleteBehavior.SetNull);
    }
}
