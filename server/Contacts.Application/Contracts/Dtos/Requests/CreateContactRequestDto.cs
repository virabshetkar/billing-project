using System.ComponentModel.DataAnnotations;

namespace Contacts.Application.Contracts;

public class CreateContactRequestDto
{
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Phone { get; set; } = null!;
    public string? Email { get; set; }
}

