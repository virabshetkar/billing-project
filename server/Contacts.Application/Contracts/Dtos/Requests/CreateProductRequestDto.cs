using System.ComponentModel.DataAnnotations;

namespace Contacts.Application.Contracts;

public class CreateProductRequestDto
{
    [Required]
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
}
