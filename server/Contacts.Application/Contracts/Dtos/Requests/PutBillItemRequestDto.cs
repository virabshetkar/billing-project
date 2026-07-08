namespace Contacts.Application.Contracts;

public class PutBillItemRequestDto
{
    public Guid ProductId { get; set; }
    public decimal Rate { get; set; }
    public decimal Quantity { get; set; }
}
