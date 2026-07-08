using Contacts.Domain;

namespace Contacts.Application.Contracts;

public interface IProductsRepository
{
    Task<ProductModel> CreateProduct(ProductModel product);
    Task<ProductModel?> DeleteProduct(Guid id);
    Task<List<ProductModel>> GetAllProducts();
    Task<ProductModel?> GetProduct(Guid id);
    Task<ProductModel> PutProduct(Guid id, ProductModel product);
}
