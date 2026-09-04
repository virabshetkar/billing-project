using Contacts.Domain.Interfaces;

namespace Contacts.Domain;

public class ContactModel : IAuditable
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string? Email { get; set; }
    public ICollection<BillModel> Bills { get; set; } = [];

    public decimal TotalDebt => Bills.Sum(b => b.TotalAmount);

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}

