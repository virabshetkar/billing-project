namespace Contacts.Domain;

public class BillItemModel
{
    public decimal Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount => Rate * Quantity;

    // Foreign Key References
    public Guid ProductId { get; set; }
    public Guid BillId { get; set; }
    public ProductModel Product { get; set; } = null!;
    public BillModel Bill { get; set; } = null!;
}
