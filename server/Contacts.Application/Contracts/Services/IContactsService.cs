using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IContactsService
{
    Task<ContactDto> CreateContact(CreateContactRequestDto contact);
    Task<ContactDto?> DeleteContact(Guid id);
    Task<IList<ContactDto>> GetAllContacts();
    Task<ContactDto?> GetContact(Guid id);
    Task<ContactDto> PutContact(Guid id, CreateContactRequestDto contact);
}
