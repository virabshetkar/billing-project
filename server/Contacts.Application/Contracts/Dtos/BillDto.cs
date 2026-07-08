using Contacts.Domain;

namespace Contacts.Application.Contracts;

public class BillDto
{
    public Guid Id { get; set; }
    public Guid ContactId { get; set; }
    public ICollection<BillItemDto> Items { get; set; } = [];
    public DateTime? DueAtUtc { get; set; }

    public BillStatus Status { get; set; } = BillStatus.Draft;
    public DateTime? IssuedAtUtc { get; set; }
    public DateTime? PaidAtUtc { get; set; }

    public decimal TotalAmount => Items.Count > 0 ? Items.Sum(i => i.Amount) : 0;
}
