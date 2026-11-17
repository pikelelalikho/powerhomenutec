using Bedrock.Api.Data; using Bedrock.Api.Models;
using Microsoft.AspNetCore.Authorization; using Microsoft.AspNetCore.Mvc; using Microsoft.EntityFrameworkCore;
namespace Bedrock.Api.Controllers;

[ApiController, Route("api")]
public class ProjectsController(AppDbContext db, IWebHostEnvironment env) : ControllerBase
{
    int TenantId => int.Parse(User.FindFirst("tenantId")!.Value);

    [HttpGet("c/{slug}")]
    public async Task<IActionResult> Tenant(string slug) =>
        await db.Tenants.FirstOrDefaultAsync(t => t.Slug == slug) is { } t ? Ok(t) : NotFound();

    [HttpGet("c/{slug}/projects")]
    public async Task<IActionResult> List(string slug, string? category)
    {
        var t = await db.Tenants.FirstOrDefaultAsync(x => x.Slug == slug);
        if (t is null) return NotFound();
        var q = db.Projects.Include(p => p.Images).Where(p => p.TenantId == t.Id);
        if (!string.IsNullOrEmpty(category)) q = q.Where(p => p.Category == category);
        return Ok(await q.OrderByDescending(p => p.CreatedAt).ToListAsync());
    }

    [HttpGet("projects/{id:int}")]
    public async Task<IActionResult> One(int id) =>
        await db.Projects.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id) is { } p ? Ok(p) : NotFound();

    [Authorize, HttpPost("projects"), RequestSizeLimit(50_000_000)]
    public async Task<IActionResult> Create([FromForm] string title, [FromForm] string description, [FromForm] string category, List<IFormFile> photos)
    {
        var p = new Project { TenantId = TenantId, Title = title, Description = description, Category = category };
        var dir = Path.Combine(env.ContentRootPath, "wwwroot", "uploads"); Directory.CreateDirectory(dir);
        foreach (var f in photos.Where(f => f.ContentType.StartsWith("image/")))
        {
            var name = $"{Guid.NewGuid()}{Path.GetExtension(f.FileName)}";
            await using var s = System.IO.File.Create(Path.Combine(dir, name));
            await f.CopyToAsync(s);
            p.Images.Add(new ProjectImage { Url = $"/uploads/{name}" });
        }
        db.Projects.Add(p); await db.SaveChangesAsync();
        return Ok(p);
    }

    [Authorize, HttpDelete("projects/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await db.Projects.FirstOrDefaultAsync(x => x.Id == id && x.TenantId == TenantId);
        if (p is null) return NotFound();
        db.Projects.Remove(p); await db.SaveChangesAsync(); return NoContent();
    }

    [HttpPost("c/{slug}/quotes")]
    public async Task<IActionResult> Quote(string slug, QuoteRequest q)
    {
        var t = await db.Tenants.FirstOrDefaultAsync(x => x.Slug == slug);
        if (t is null) return NotFound();
        q.Id = 0; q.TenantId = t.Id; q.CreatedAt = DateTime.UtcNow;
        db.Quotes.Add(q); await db.SaveChangesAsync(); return Ok();
    }

    [Authorize, HttpGet("quotes")]
    public async Task<IActionResult> Quotes() =>
        Ok(await db.Quotes.Where(q => q.TenantId == TenantId).OrderByDescending(q => q.CreatedAt).ToListAsync());
}
