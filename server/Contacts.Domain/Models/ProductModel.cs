namespace Contacts.Domain;

public class ProductModel
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public decimal Rate { get; set; }
    public string? Description { get; set; } = null!;

    // Foreign Key References
    public ICollection<BillItemModel> BillItems { get; set; } = [];
}
