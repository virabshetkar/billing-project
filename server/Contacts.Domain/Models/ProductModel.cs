using Contacts.Domain.Interfaces;

namespace Contacts.Domain;

public class ProductModel : IAuditable
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public decimal Rate { get; set; }
    public string? Description { get; set; } = null!;

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    // Foreign Key References
    public ICollection<BillItemModel> BillItems { get; set; } = [];
}
