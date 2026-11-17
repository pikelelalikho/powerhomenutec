using Microsoft.AspNetCore.Identity;
namespace Bedrock.Api.Models;

public class Tenant { public int Id { get; set; } public string Name { get; set; } = ""; public string Slug { get; set; } = ""; public string Tagline { get; set; } = ""; public string Phone { get; set; } = ""; public string Address { get; set; } = ""; }
public class AppUser : IdentityUser { public int TenantId { get; set; } }
public class Project
{
    public int Id { get; set; } public int TenantId { get; set; }
    public string Title { get; set; } = ""; public string Description { get; set; } = "";
    public string Category { get; set; } = "Flooring";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<ProjectImage> Images { get; set; } = new();
}
public class ProjectImage { public int Id { get; set; } public int ProjectId { get; set; } public string Url { get; set; } = ""; }
public class QuoteRequest { public int Id { get; set; } public int TenantId { get; set; } public string Name { get; set; } = ""; public string Email { get; set; } = ""; public string Phone { get; set; } = ""; public string Message { get; set; } = ""; public DateTime CreatedAt { get; set; } = DateTime.UtcNow; }
