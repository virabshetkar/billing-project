using Contacts.Application.Contracts;
using Contacts.Domain;

public static class ProductMappingExtensions
{
    public static ProductDto ToProductDto(this ProductModel productModel)
    {
        var res = new ProductDto()
        {
            Id = productModel.Id,
            Title = productModel.Title,
            Description = productModel.Description
        };

        return res;
    }

    public static ProductModel ToProductModel(this CreateProductRequestDto productModel)
    {
        var res = new ProductModel()
        {
            Title = productModel.Title,
            Description = productModel.Description
        };

        return res;
    }
}
