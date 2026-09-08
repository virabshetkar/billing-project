using Contacts.Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.WebApi.Controllers;

[ApiController]
[Route("/api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly IContactsService service;
    public ContactsController(IContactsService service)
    {
        this.service = service;
    }

    [HttpGet(Name = "GetContacts")]
    public async Task<IActionResult> Get(int limit = 20, int skip = 0)
    {
        var contacts = await this.service.GetAllContacts(limit, skip);
        return Ok(contacts);
    }

    [HttpGet("{id:guid}", Name = "GetContact")]
    public async Task<ActionResult<ContactDto?>> GetOne(Guid id)
    {
        var contact = await this.service.GetContact(id);
        if (contact is null) return NotFound();
        return Ok(contact);
    }

    [HttpPost(Name = "CreateContact")]
    public async Task<IActionResult> Create(CreateContactRequestDto contact)
    {
        var contactModel = await this.service.CreateContact(contact);
        return CreatedAtAction(nameof(GetOne), new { id = contactModel.Id }, contactModel);
    }

    [HttpPut("{id:guid}", Name = "PutContact")]
    public async Task<IActionResult> Put(Guid id, CreateContactRequestDto contact)
    {
        var contactModel = await this.service.PutContact(id, contact);
        if (contactModel.Id == Guid.Empty)
        {
            contactModel.Id = id;
            return Ok(contactModel);
        }
        return CreatedAtAction(nameof(GetOne), new { id = contactModel.Id }, contactModel);
    }

    [HttpDelete("{id:guid}", Name = "DeleteContact")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var contactModel = await this.service.DeleteContact(id);
        if (contactModel is null) return NotFound();
        return Ok(contactModel);
    }
}
