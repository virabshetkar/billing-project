using Contacts.Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.WebApi.Controllers;

[ApiController]
[Route("api/bills")]
public class BillsController : ControllerBase
{
    private readonly IBillsService billsService;
    public BillsController(IBillsService billsService)
    {
        this.billsService = billsService;
    }

    [HttpGet]
    public async Task<ActionResult<IList<BillDto>>> Get([FromQuery] Guid contactId)
    {
        var bills = await this.billsService.GetAllBillsForContact(contactId);
        return Ok(bills);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BillDto>> GetOne(Guid id)
    {
        var bill = await this.billsService.GetBill(id);
        if (bill is null) return NotFound();
        return Ok(bill);
    }

    [HttpPost]
    public async Task<ActionResult<BillDto>> Post(CreateBillRequestDto billRequest)
    {
        var bill = await this.billsService.CreateBill(billRequest);
        return CreatedAtAction(nameof(GetOne), new { id = bill.Id }, bill);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<BillDto>> Put(Guid id, PutBillRequestDto billRequest)
    {
        var bill = await this.billsService.PutBill(id, billRequest);
        if (bill.Id == Guid.Empty)
        {
            return Ok(bill);
        }
        return CreatedAtAction(nameof(GetOne), new { id = bill.Id }, bill);

    }
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<BillDto>> Delete(Guid id)
    {
        var bill = await this.billsService.DeleteBill(id);
        if (bill is null) return NotFound();
        return Ok(bill);
    }

    [HttpPut("{id:guid}/issue")]
    public async Task<ActionResult<BillDto>> Issue(Guid id)
    {
        var bill = await this.billsService.IssueBill(id);
        if (bill is null) return NotFound();
        return Ok(bill);
    }

    [HttpPut("{id:guid}/pay")]
    public async Task<ActionResult<BillDto>> Pay(Guid id)
    {
        var bill = await this.billsService.PayBill(id);
        if (bill is null) return NotFound();
        return Ok(bill);
    }
}
