using System.Text.Json;
using Contacts.Application.Contracts;
using Contacts.Domain;
using Contacts.Domain.Exceptions;
using Contacts.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Repositories;


public class BillsRepository : IBillsRepository
{
    private readonly AppDbContext context;

    public BillsRepository(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<BillModel> CreateBill(BillModel bill)
    {
        var billModel = await this.context.Bills.AddAsync(bill);
        await this.context.SaveChangesAsync();
        return billModel.Entity;
    }

    public async Task<BillModel?> DeleteBill(Guid billId)
    {
        var billModel = await this.context.Bills.FirstOrDefaultAsync(b => b.Id == billId);
        if (billModel is null) return null;
        if (billModel.Status != BillStatus.Draft) throw new BusinessRuleException("Can only delete bills in draft.");

        await this.context.Bills.Where(b => b.Id == billId).ExecuteDeleteAsync();
        return billModel;
    }

    public async Task<IList<BillModel>> GetAllBillsForContact(Guid contactId)
    {
        var bills = this.context.Bills.Where(b => b.ContactId == contactId);
        return bills.ToList();
    }

    public async Task<BillModel?> GetBill(Guid billId)
    {
        var bill = await this.context.Bills.FirstOrDefaultAsync(b => b.Id == billId);
        return bill;
    }

    public async Task<BillModel?> IssueBill(Guid billId)
    {
        var bill = await this.context.Bills.FirstOrDefaultAsync(b => b.Id == billId);
        if (bill is null) return null;

        bill.IssueBill();

        await this.context.SaveChangesAsync();

        return bill;
    }

    public async Task<BillModel?> PayBill(Guid billId)
    {
        var bill = await this.context.Bills.FirstOrDefaultAsync(b => b.Id == billId);
        if (bill is null) return null;

        bill.PayBill();

        await this.context.SaveChangesAsync();

        return bill;
    }

    public async Task<BillModel> PutBill(Guid billId, BillModel bill)
    {
        var billModel = await this.context.Bills.FirstOrDefaultAsync(b => b.Id == billId);

        if (billModel is not null)
        {
            billModel.Items.Clear();
            foreach (var billItem in bill.Items)
            {
                billModel.Items.Add(billItem);
            }
            billModel.ContactId = bill.ContactId;
            billModel.DueAtUtc = bill.DueAtUtc;
        }
        else
        {
            throw new Exception("Can't create using PUT");
        }

        await this.context.SaveChangesAsync();

        return bill;
    }
}
