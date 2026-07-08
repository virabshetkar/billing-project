using System.ComponentModel.DataAnnotations;
using Contacts.Application.Contracts;

namespace Contacts.Application.Contracts;


public class PutBillRequestDto
{
    [Required]
    public Guid ContactId { get; set; }
    public DateOnly? DueAtDate { get; set; }
    public ICollection<PutBillItemRequestDto> Items { get; set; } = [];
}
