using System.IdentityModel.Tokens.Jwt; using System.Security.Claims; using System.Text;
using Bedrock.Api.Models;
using Microsoft.AspNetCore.Identity; using Microsoft.AspNetCore.Mvc; using Microsoft.IdentityModel.Tokens;
namespace Bedrock.Api.Controllers;

public record LoginDto(string Email, string Password);

[ApiController, Route("api/auth")]
public class AuthController(UserManager<AppUser> users, IConfiguration cfg) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto d)
    {
        var u = await users.FindByEmailAsync(d.Email);
        if (u is null || !await users.CheckPasswordAsync(u, d.Password)) return Unauthorized(new { error = "Invalid email or password" });
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, u.Id), new Claim("tenantId", u.TenantId.ToString()) };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["Jwt:Key"]!));
        var token = new JwtSecurityToken(cfg["Jwt:Issuer"], cfg["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}
