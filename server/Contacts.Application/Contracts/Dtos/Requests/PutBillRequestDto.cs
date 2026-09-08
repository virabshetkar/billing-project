using System.ComponentModel.DataAnnotations;

namespace Contacts.Application.Contracts;


public class PutBillRequestDto
{
    [Required]
    public Guid ContactId { get; set; }
    public DateOnly? DueAtDate { get; set; }
    public ICollection<PutBillItemRequestDto> Items { get; set; } = [];
}
