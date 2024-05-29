using AzureShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AzureShop.Controllers;
[ApiController]
[Route("products")]
public class ProductController : ControllerBase
{
    private readonly StoreContext _context;

    public ProductController(StoreContext context)
    {
        _context = context;
        context.Database.EnsureCreated();
    }

    // GET: /products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = from p in _context.Products select p;

        return Ok(await products.AsNoTracking().ToListAsync());
    }

    // GET: /products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(string id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    // POST: /products
    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        product.Id = Guid.NewGuid().ToString();
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: /products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(string id, Product product)
    {
        if (id != product.Id)
        {
            return BadRequest();
        }

        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }

    // DELETE: /products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("bycategory/{id}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string id)
    {
        var products = from p in _context.Products
                       where p.CategoryId == id
                       select p;

        return await products.AsNoTracking().ToListAsync();
    }

}