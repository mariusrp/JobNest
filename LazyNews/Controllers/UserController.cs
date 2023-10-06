
// UserController.cs
using LazyNews.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LazyNews.Models;
using MongoDB.Bson.IO;
using Newtonsoft.Json;


namespace LazyNews.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        [HttpPost("login-or-create-user")]
        public async Task<IActionResult> LoginOrCreateUser([FromBody] User user)
        {
            string userJson = Newtonsoft.Json.JsonConvert.SerializeObject(user);
            Console.WriteLine($"Received user: {userJson}");
            var loggedInUser = await _userRepository.LoginOrCreateUserAsync(user);
            return Ok(new { message = "Login successful.", user = loggedInUser });
        }
        

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var info = await _userRepository.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return new JsonResult(new { success = false, message = "Login was cancelled or an error occurred." });
            }

            try
            {
                var user = await _userRepository.HandleGoogleLoginAsync(info);
                if (user == null)
                {
                    return new JsonResult(new { success = false, message = "User already has a local account." });
                }
                return new JsonResult(new { success = true, message = "Login successful.", user });
            }
            catch (Exception ex)
            {
                // Handle error (log it, return an error response, etc.)
                return new JsonResult(new { success = false, message = ex.Message });
            }
        }

    }
}




