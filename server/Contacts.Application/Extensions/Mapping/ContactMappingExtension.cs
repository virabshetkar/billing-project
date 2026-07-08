using Contacts.Application.Contracts;
using Contacts.Domain;

namespace Contacts.Application.Services;


public static class ContactMappingExtensions
{
    public static ContactDto ToContactDto(this ContactModel contactModel)
    {
        var res = new ContactDto()
        {
            Id = contactModel.Id,
            Name = contactModel.Name,
            Phone = contactModel.Phone,
            Email = contactModel.Email
        };

        return res;
    }

    public static ContactModel ToContactModel(this CreateContactRequestDto contactRequest)
    {
        var res = new ContactModel
        {
            Name = contactRequest.Name,
            Phone = contactRequest.Phone,
            Email = contactRequest.Email
        };

        return res;
    }
}
