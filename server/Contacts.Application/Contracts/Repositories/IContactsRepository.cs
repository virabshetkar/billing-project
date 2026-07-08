using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IContactsRepository
{
    Task<ContactModel> CreateContact(ContactModel contact);
    Task<ContactModel?> DeleteContact(Guid id);
    Task<List<ContactModel>> GetAllContacts();
    Task<ContactModel?> GetContact(Guid id);
    Task<ContactModel> PutContact(Guid id, ContactModel contact);
}
