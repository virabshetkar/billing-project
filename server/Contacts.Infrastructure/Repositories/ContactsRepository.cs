using Contacts.Application.Contracts;
using Contacts.Domain;
using Contacts.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Repositories;


public class ContactsRepository : IContactsRepository
{
    private readonly AppDbContext _context;

    public ContactsRepository(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<ContactModel>> GetAllContacts(int limit, int skip)
    {
        return await this._context.Contacts.OrderBy(c => c.Name).Skip(skip).Take(limit).ToListAsync();
    }

    public async Task<ContactModel?> GetContact(Guid id)
    {
        return await this._context.Contacts.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<ContactModel> CreateContact(ContactModel contact)
    {
        await this._context.Contacts.AddAsync(contact);
        await this._context.SaveChangesAsync();

        return contact;
    }

    public async Task<ContactModel> PutContact(Guid id, ContactModel contact)
    {
        var contactModel = await this._context.Contacts.FirstOrDefaultAsync(c => c.Id == id);
        if (contactModel is null)
        {
            contact.Id = id;
            await this._context.Contacts.AddAsync(contact);
        }
        else
        {
            contactModel.Email = contact.Email;
            contactModel.Name = contact.Name;
            contactModel.Phone = contact.Phone;
            this._context.Contacts.Update(contactModel);
        }

        await this._context.SaveChangesAsync();

        return contact;
    }

    public async Task<ContactModel?> DeleteContact(Guid id)
    {
        var contactModel = await this._context.Contacts.FirstOrDefaultAsync(c => c.Id == id);
        await this._context.Contacts.Where(c => c.Id == id).ExecuteDeleteAsync();
        return contactModel;
    }
}
