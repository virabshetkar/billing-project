using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IBillsRepository
{
    Task<BillModel> CreateBill(BillModel bill);
    Task<IList<BillModel>> GetAllBillsForContact(Guid contactId);
    Task<BillModel?> GetBill(Guid billId);
    Task<BillModel?> DeleteBill(Guid billId);
    Task<BillModel> PutBill(Guid billId, BillModel bill);
    Task<BillModel?> IssueBill(Guid billId);
    Task<BillModel?> PayBill(Guid billId);
}
