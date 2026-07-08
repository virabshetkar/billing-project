using Contacts.Application.Contracts;
using Contacts.Domain;
using Contacts.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Repositories;


public class ProductsRepository : IProductsRepository
{
    private readonly AppDbContext _context;

    public ProductsRepository(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<ProductModel>> GetAllProducts()
    {
        return await this._context.Products.ToListAsync();
    }

    public async Task<ProductModel?> GetProduct(Guid id)
    {
        return await this._context.Products.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<ProductModel> CreateProduct(ProductModel product)
    {
        await this._context.Products.AddAsync(product);
        await this._context.SaveChangesAsync();

        return product;
    }

    public async Task<ProductModel> PutProduct(Guid id, ProductModel product)
    {
        var productModel = await this._context.Products.FirstOrDefaultAsync(c => c.Id == id);
        if (productModel is null)
        {
            product.Id = id;
            await this._context.Products.AddAsync(product);
        }
        else
        {
            productModel.Title = product.Title;
            productModel.Description = product.Description;
            productModel.Rate = product.Rate;
            this._context.Products.Update(productModel);
        }

        await this._context.SaveChangesAsync();

        return product;
    }

    public async Task<ProductModel?> DeleteProduct(Guid id)
    {
        var productModel = await this._context.Products.FirstOrDefaultAsync(c => c.Id == id);
        await this._context.Products.Where(c => c.Id == id).ExecuteDeleteAsync();
        return productModel;
    }
}
