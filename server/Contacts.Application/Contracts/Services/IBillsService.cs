namespace Contacts.Application.Contracts;

public interface IBillsService
{
    Task<BillDto> CreateBill(CreateBillRequestDto bill);
    Task<BillDto?> DeleteBill(Guid id);
    Task<IList<BillDto>> GetAllBillsForContact(Guid contactId);
    Task<BillDto?> GetBill(Guid id);
    Task<BillDto> PutBill(Guid id, PutBillRequestDto bill);
    Task<BillDto?> IssueBill(Guid id);
    Task<BillDto?> PayBill(Guid id);
}
