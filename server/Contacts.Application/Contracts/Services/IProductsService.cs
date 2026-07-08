using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IProductsService
{
    Task<ProductDto> CreateProduct(CreateProductRequestDto product);
    Task<ProductDto?> DeleteProduct(Guid id);
    Task<List<ProductDto>> GetAllProducts();
    Task<ProductDto?> GetProduct(Guid id);
    Task<ProductDto> PutProduct(Guid id, CreateProductRequestDto product);
}
