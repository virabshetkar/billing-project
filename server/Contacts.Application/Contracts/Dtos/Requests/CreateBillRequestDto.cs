using System.ComponentModel.DataAnnotations;

namespace Contacts.Application.Contracts;

public class CreateBillRequestDto
{
    [Required]
    public Guid ContactId { get; set; }
    public DateOnly? DueAtDate { get; set; }
}
