using Contacts.Application.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.WebApi.Controllers;

[ApiController]
[Route("/api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductsService service;
    public ProductsController(IProductsService service)
    {
        this.service = service;
    }

    [HttpGet(Name = "GetProducts")]
    public async Task<IActionResult> Get()
    {
        var products = await this.service.GetAllProducts();
        return Ok(products);
    }

    [HttpGet("{id}", Name = "GetProduct")]
    public async Task<ActionResult<ProductDto>> GetOne(Guid id)
    {
        var product = await this.service.GetProduct(id);
        if (product is null) return NotFound();
        return Ok(product);
    }

    [HttpPost(Name = "CreateProduct")]
    public async Task<IActionResult> Create(CreateProductRequestDto product)
    {
        var productModel = await this.service.CreateProduct(product);
        return CreatedAtAction(nameof(GetOne), new { id = productModel.Id }, productModel);
    }

    [HttpPut("{id}", Name = "PutProduct")]
    public async Task<IActionResult> Put(Guid id, CreateProductRequestDto product)
    {
        var productModel = await this.service.PutProduct(id, product);
        if (productModel.Id == Guid.Empty)
        {
            productModel.Id = id;
            return Ok(productModel);
        }
        return CreatedAtAction(nameof(GetOne), new { id = productModel.Id }, productModel);
    }

    [HttpDelete("{id}", Name = "DeleteProduct")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var productModel = await this.service.DeleteProduct(id);
        if (productModel is null) return NotFound();
        return Ok(productModel);
    }
}
