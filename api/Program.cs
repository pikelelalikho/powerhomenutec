using System.Text;
using Bedrock.Api.Data; using Bedrock.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore; using Microsoft.IdentityModel.Tokens;

var b = WebApplication.CreateBuilder(args);
b.WebHost.UseUrls("http://localhost:5000");
b.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(b.Configuration.GetConnectionString("Default")));
b.Services.AddIdentityCore<AppUser>().AddEntityFrameworkStores<AppDbContext>();
b.Services.AddControllers();
b.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(b.Configuration["Cors:Origin"]!).AllowAnyHeader().AllowAnyMethod()));
b.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o => o.TokenValidationParameters = new()
{
    ValidIssuer = b.Configuration["Jwt:Issuer"], ValidAudience = b.Configuration["Jwt:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(b.Configuration["Jwt:Key"]!))
});
b.Services.AddAuthorization();

var app = b.Build();
Directory.CreateDirectory(Path.Combine(app.Environment.ContentRootPath, "wwwroot", "uploads"));

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();   // swap for migrations in production
    if (!db.Tenants.Any())
    {
        var t = new Tenant { Name = "Bedrock Surfaces", Slug = "bedrock", Tagline = "Home & Industrial Flooring", Phone = "+27 00 000 0000", Address = "Cape Town, South Africa" };
        db.Tenants.Add(t); db.SaveChanges();
        var um = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        um.CreateAsync(new AppUser { UserName = "admin@bedrock.local", Email = "admin@bedrock.local", TenantId = t.Id }, "Admin123!").GetAwaiter().GetResult();
    }
}

app.UseCors(); app.UseStaticFiles(); app.UseAuthentication(); app.UseAuthorization();
app.MapControllers();
app.Run();
