using Contacts.Application.Contracts;

namespace Contacts.Application.Services;

public class ProductsService : IProductsService
{
    private readonly IProductsRepository repo;

    public ProductsService(IProductsRepository repo)
    {
        this.repo = repo;
    }

    public async Task<ProductDto> CreateProduct(CreateProductRequestDto product)
    {
        var productModel = await this.repo.CreateProduct(product.ToProductModel());

        return productModel.ToProductDto();
    }

    public async Task<ProductDto> PutProduct(Guid id, CreateProductRequestDto product)
    {
        var productModel = await this.repo.PutProduct(id, product.ToProductModel());
        return productModel.ToProductDto();
    }

    public async Task<ProductDto?> DeleteProduct(Guid id)
    {
        var productModel = await this.repo.DeleteProduct(id);
        return productModel?.ToProductDto();
    }

    public async Task<List<ProductDto>> GetAllProducts()
    {
        var products = await this.repo.GetAllProducts();
        return products.Select(p => p.ToProductDto()).ToList();
    }

    public async Task<ProductDto?> GetProduct(Guid id)
    {
        var productModel = await this.repo.GetProduct(id);
        return productModel?.ToProductDto();
    }
}
