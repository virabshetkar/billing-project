using Contacts.Application.Contracts;

namespace Contacts.Application.Services;

public class BillsService : IBillsService
{
    private readonly IBillsRepository repo;

    public BillsService(IBillsRepository repo)
    {
        this.repo = repo;
    }

    public async Task<BillDto> CreateBill(CreateBillRequestDto bill)
    {
        var createBill = bill.ToBillModel();
        var billModel = await this.repo.CreateBill(createBill);

        return billModel.ToBillDto();
    }

    public async Task<BillDto?> DeleteBill(Guid id)
    {
        var billModel = await this.repo.DeleteBill(id);

        return billModel?.ToBillDto();
    }

    public async Task<IList<BillDto>> GetAllBillsForContact(Guid contactId)
    {
        var bills = await this.repo.GetAllBillsForContact(contactId);

        return bills.Select(b => b.ToBillDto()).ToList();
    }

    public async Task<BillDto?> GetBill(Guid id)
    {
        var bill = await this.repo.GetBill(id);

        return bill?.ToBillDto();
    }

    public async Task<BillDto?> IssueBill(Guid id)
    {
        var bill = await this.repo.IssueBill(id);

        return bill?.ToBillDto();
    }

    public async Task<BillDto?> PayBill(Guid id)
    {
        var bill = await this.repo.PayBill(id);

        return bill?.ToBillDto();
    }

    public async Task<BillDto> PutBill(Guid id, PutBillRequestDto billRequest)
    {
        var billModelRequest = billRequest.ToBillModel();

        foreach (var item in billRequest.Items)
        {
            billModelRequest.Items.Add(item.ToBillItemModel());
        }

        var billModel = await this.repo.PutBill(id, billModelRequest);

        return billModel.ToBillDto();
    }
}
