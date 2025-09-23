using DesafioAPI.Models;
using DesafioAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DesafioAPI.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(IUserService userService, IJwtTokenService jwtTokenService)
        {
            _userService = userService;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.AuthenticateAsync(loginDto.Email, loginDto.Password);
            
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });

            var token = _jwtTokenService.GenerateToken(user);
            var expires = DateTime.UtcNow.AddHours(1);

            var userResponse = new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Country = user.Country,
                Languages = user.Languages,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };

            var response = new LoginResponseDto
            {
                Token = token,
                Expires = expires,
                User = userResponse
            };

            return Ok(response);
        }
    }
}