using Contacts.Domain.Exceptions;

namespace Contacts.Domain;

public class BillModel
{
    public static string TZ = TimeZoneInfo.Local.Id;

    public Guid Id { get; set; }
    public DateTime? IssuedAtUtc { get; private set; }
    public DateTime? PaidAtUtc { get; private set; }
    public DateTime? DueAtUtc { get; set; }
    public BillStatus Status { get; set; } = BillStatus.Draft;

    public decimal TotalAmount => Items.Sum(i => i.Amount);
    public bool? IsOverdue => DueAtUtc is null ? null : DueAtUtc < DateTime.UtcNow;
    public bool IsPaid => PaidAtUtc is not null;

    // Foreign Key References
    public Guid ContactId { get; set; }
    public ContactModel Contact { get; set; } = null!;
    public ICollection<BillItemModel> Items { get; set; } = [];

    public void PayBill()
    {
        this.Status = BillStatus.Paid;
        this.PaidAtUtc = DateTime.UtcNow;
    }

    public void IssueBill()
    {
        if (Items.Count == 0) throw new BusinessRuleException("No bill items in issued bill");
        this.Status = BillStatus.Unpaid;
        this.IssuedAtUtc = DateTime.UtcNow;
    }

    public void SetDueAtUtc(DateOnly? date)
    {
        if (date is null || !date.HasValue && date.Value != default) return;

        var dateValue = date.Value;
        var localDateTime = dateValue.ToDateTime(TimeOnly.MaxValue);
        var dateTime = TimeZoneInfo.ConvertTimeToUtc(localDateTime, TimeZoneInfo.FindSystemTimeZoneById("Asia/Kolkata"));

        DueAtUtc = dateTime;
    }
}

