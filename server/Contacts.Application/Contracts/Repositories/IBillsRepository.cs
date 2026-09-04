using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IBillsRepository
{
    Task<BillModel> CreateBill(BillModel bill, CancellationToken cancellationToken = default);
    Task<IList<BillModel>> GetAllBillsForContact(Guid contactId);
    Task<BillModel?> GetBill(Guid billId);
    Task<BillModel?> DeleteBill(Guid billId, CancellationToken cancellationToken = default);
    Task<BillModel> PutBill(Guid billId, BillModel bill, CancellationToken cancellationToken = default);
    Task<BillModel?> IssueBill(Guid billId, CancellationToken cancellationToken = default);
    Task<BillModel?> PayBill(Guid billId, CancellationToken cancellationToken = default);
}
