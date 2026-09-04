namespace Contacts.Domain.Interfaces;


public interface IAuditable
{
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
