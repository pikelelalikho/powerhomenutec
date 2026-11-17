using Bedrock.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Bedrock.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> o) : IdentityDbContext<AppUser>(o)
{
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ProjectImage> ProjectImages => Set<ProjectImage>();
    public DbSet<QuoteRequest> Quotes => Set<QuoteRequest>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);
        b.Entity<Tenant>().HasIndex(t => t.Slug).IsUnique();
    }
}
