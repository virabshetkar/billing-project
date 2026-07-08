namespace Contacts.Application.Contracts;

public class BillItemDto
{
    public Guid BillId { get; set; }
    public Guid ProductId { get; set; }
    public decimal Rate { get; set; }
    public decimal Quantity { get; set; }
    public decimal Amount => Rate * Quantity;
}
