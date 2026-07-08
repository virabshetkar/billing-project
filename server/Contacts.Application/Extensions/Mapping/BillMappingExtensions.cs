using Contacts.Application.Contracts;
using Contacts.Domain;

namespace Contacts.Application.Services;


public static class BillMappingExtensions
{
    public static BillDto ToBillDto(this BillModel billModel)
    {
        var res = new BillDto()
        {
            Id = billModel.Id,
            ContactId = billModel.ContactId,
            Items = billModel.Items.Select(i => i.ToBillItemDto()).ToList(),
            DueAtUtc = billModel.DueAtUtc,
            Status = billModel.Status,
            IssuedAtUtc = billModel.IssuedAtUtc,
            PaidAtUtc = billModel.PaidAtUtc,
        };

        return res;
    }

    public static BillItemDto ToBillItemDto(this BillItemModel billItemModel)
    {
        var res = new BillItemDto
        {
            BillId = billItemModel.BillId,
            ProductId = billItemModel.ProductId,
            Rate = billItemModel.Rate,
            Quantity = billItemModel.Quantity
        };

        return res;
    }

    public static BillModel ToBillModel(this CreateBillRequestDto billRequest)
    {
        var res = new BillModel
        {
            ContactId = billRequest.ContactId,
        };
        res.SetDueAtUtc(billRequest.DueAtDate);

        return res;
    }

    public static BillModel ToBillModel(this PutBillRequestDto billRequest)
    {
        var res = new BillModel
        {
            ContactId = billRequest.ContactId,
            Items = billRequest.Items.Select(br => br.ToBillItemModel()).ToList()
        };
        res.SetDueAtUtc(billRequest.DueAtDate);

        return res;
    }

    public static BillItemModel ToBillItemModel(this PutBillItemRequestDto billItemRequest)
    {
        var res = new BillItemModel
        {
            ProductId = billItemRequest.ProductId,
            Rate = billItemRequest.Rate,
            Quantity = billItemRequest.Quantity
        };

        return res;
    }
}
