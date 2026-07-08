using Contacts.Application.Contracts;
using Contacts.Domain;

namespace Contacts.Application.Services;

public class ContactsService : IContactsService
{
    private readonly IContactsRepository repo;

    public ContactsService(IContactsRepository repo)
    {
        this.repo = repo;
    }

    public async Task<ContactDto> CreateContact(CreateContactRequestDto contact)
    {
        var contactModel = await this.repo.CreateContact(contact.ToContactModel());

        return contactModel.ToContactDto();
    }

    public async Task<ContactDto> PutContact(Guid id, CreateContactRequestDto contact)
    {
        var contactModel = await this.repo.PutContact(id, contact.ToContactModel());

        return contactModel.ToContactDto();
    }

    public async Task<ContactDto?> DeleteContact(Guid id)
    {
        var contactModel = await this.repo.DeleteContact(id);
        if (contactModel is null) return null;

        return contactModel.ToContactDto();
    }

    public async Task<IList<ContactDto>> GetAllContacts()
    {
        var contacts = await this.repo.GetAllContacts();

        return contacts.Select(c => c.ToContactDto()).ToList();
    }

    public async Task<ContactDto?> GetContact(Guid id)
    {
        var contactModel = await this.repo.GetContact(id);
        if (contactModel is null) return null;

        return contactModel.ToContactDto();
    }
}
